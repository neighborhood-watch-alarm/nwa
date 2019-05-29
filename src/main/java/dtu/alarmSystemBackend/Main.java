package dtu.alarmSystemBackend;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.thethingsnetwork.data.common.Connection;
import org.thethingsnetwork.data.mqtt.Client;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import org.thethingsnetwork.data.common.messages.ActivationMessage;
import org.thethingsnetwork.data.common.messages.DataMessage;
import org.thethingsnetwork.data.common.messages.DownlinkMessage;

import dtu.components.Component;
import dtu.database.Database;
import dtu.database.DatabaseArrayList;
import dtu.house.House;
import dtu.house.HouseID;
import dtu.house.PhoneAddress;
import dtu.ttnCommunication.MSGrecver;

/**
 * Hello world!
 *
 */
public class Main 
{
	private Database<House> houseDB;
	private Database<Component> deviceDB;
	private Database<PhoneAddress> phoneAddrDB;
	private ArrayList<House> warningHouses = new ArrayList<House>();
	private Alarm alarm;
	
	//Amount of seconds from when an alarm is seen to when it should be seen again.
	private int lastSeenMaxTime = 90;
	//Amount of time when the alarm goes off
	private int alarmTime = 1;
	
	
	private Gson gson;
	private TimerSystem timerSystem;
	private Client client;
	
	
	public static void main(String[] args) throws MqttException, Exception
	{
		new Main();

	}
	
	public void resetHouseArm()
	{
		List<House> houses = houseDB.filter(house -> house.equals(house));
		for (House house : houses)
		{
			if (house.getArmStatus())
				house.toggleArm();
		}
	}
	
	public void resetLastSeen()
	{
		List<Component> devices = deviceDB.filter(device -> device.equals(device));
		for (Component device : devices)
		{
			device.updateLastDate(null);
		}
	}
		
	public Main() throws MqttException, Exception
	{
		gson = new GsonBuilder().setPrettyPrinting().create();
		readDatabaseFiles();
		//Some cleanup.
		resetHouseArm();
		resetLastSeen();
		//Setup new
		timerSystem = new TimerSystem();
		alarm = new Alarm(phoneAddrDB);		
		timerSystem.init(alarm, warningHouses);
		Thread thread = new Thread(timerSystem);
		thread.start();
		try {
			clientSetup();
		} catch (URISyntaxException e) {
			e.printStackTrace();
			System.out.println("Failed to setup communication - program failed");
			return;
		}
		//DUMMY STUFF
		//DUMMY STUFF
		while(true)
		{
			LocalDateTime localDate = LocalDateTime.now();
	        Predicate<Component> filterFunction = n -> n.getLastSignalDate() != null
	        		&&	Duration.between(n.getLastSignalDate(), localDate).getSeconds() >= lastSeenMaxTime;
			List<Component> componentCollection = deviceDB.filter(filterFunction);
			if (componentCollection.size() > 0)
			{
				HashSet<HouseID> set = new HashSet<HouseID>();
				for (Component comp : componentCollection)
				{
					set.add(comp.getHouseID());
					comp.updateLastDate(null);
				}
				List<House> houseList = houseDB.filter(house -> house.getArmStatus() && set.contains(house.getHouseID()));
				for (House house : houseList)
				{
					alarm.alarm(house);
				}
				
			}
			System.out.print(".");
			Thread.sleep(1000);		
		}
		
	}	
	
	public void clientSetup() throws MqttException, Exception
	{
		client = new MSGrecver().setupRecver();
        client.onActivation((String _devId, ActivationMessage _data) -> System.out.println("Activation: " + _devId + ", data: " + _data.getDevAddr()));
        client.onError((Throwable _error) -> System.err.println("error: " + _error.getMessage()));
        client.onConnected((Connection _client) -> System.out.println("connected !"));


		//Upon getting a message, this is how its handled - handle -> converted to byte stream -> put into its container -> sent
		client.onMessage(null, (String devId, DataMessage data) -> {
			Optional<JsonObject> result = handleMessage(data, devId);
			JsonObject elem = result.get();
			byte[] output = null;
			try {
				output = convertToBytes(elem);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			System.out.println("transmitting: ");
			for (byte msg : output)
			{
				System.out.print(msg);
			}
			System.out.println("");
    		DownlinkMessage response = new DownlinkMessage(1, output);
    		try {
				client.send(devId, response);
			} catch (Exception e) {
				System.out.println("Failed to send response back to " + devId);
				e.printStackTrace();
			}
		});
		
		client.start();
	}
	
	private Optional<JsonObject> handleMessage(DataMessage data, String deviceID) {
		JsonObject output = new JsonObject();
		JsonObject input = gson.toJsonTree(data).getAsJsonObject();
		input =  gson.toJsonTree(input.get("payloadFields")).getAsJsonObject();
		

        Predicate<Component> filterFunction = n -> n.getComponentID().getID().equals(deviceID);
        Optional<Component> optDevice = deviceDB.get(filterFunction);

        if (!optDevice.isPresent())
        {
        	//If component does not exist.
        	return Optional.empty();
        }
        Component component = optDevice.get();
        component.updateLastDate( LocalDateTime.now());
        Predicate<House> filterFunctionHouse = n -> n.getHouseID().getID().equals(component.getHouseID().getID());
        Optional<House> optHouse = houseDB.get(filterFunctionHouse);
        if (!optHouse.isPresent()) //figure out how to handle this - component exists but house got deleted? Wrong house ID perhaps in DB? Indicates corruption
        {
        	return Optional.empty();
        }
       House house = optHouse.get();
       boolean panicRecv = input.get("panic").getAsInt() == 1;
       boolean statusRecv = input.get("status").getAsInt() == 1;
       String pwRecv = input.get("password").getAsString();
       System.out.println("panicRecv: " + panicRecv + " statusRecv " + statusRecv + " arm status " + house.getArmStatus());
       boolean pwCheck = false;
       if (pwRecv.length() > 0)
       { // password - toggle things
    	 // needs some form of verification
    	   timerSystem.lockWarningHouses();
    	   house.toggleArm();
           pwCheck = true;
    	   timerSystem.unlockWarningHouse();

       }
       else if (statusRecv && panicRecv)
       {
    	   alarm.alarm(house);
       }
       else if (statusRecv && house.getArmStatus()) 
       { //ALARM START
    	   timerSystem.lockWarningHouses();
		   if (!warningHouses.contains(house))
		   {
			   warningHouses.add(house);
			   house.setHouseTime(alarmTime);
		   }
		   
		   timerSystem.unlockWarningHouse();

       }
      
       output.addProperty("armStatus", house.getArmStatus());
       output.addProperty("panic",  false);
       output.addProperty("status", pwCheck);
       return Optional.of(output);
	}

	private byte[] convertToBytes(JsonObject input) throws IOException
	{
		byte[] out = new byte[3];		
		
		if (input.get("armStatus").getAsBoolean())
		{
			out[0] = 0x01;
		}
		if (input.get("panic").getAsBoolean())
		{
			out[1] = 0x01;
		}
		if (input.get("status").getAsBoolean())
		{
			out[2] = 0x01;
		}
		return out;
	}
	
	public void saveDatabases()
	{
		FileOutputStream f1;
		try {
			f1 = new FileOutputStream(new File("database_house.txt"));
			ObjectOutputStream  o1 = new ObjectOutputStream (f1);
			FileOutputStream f2 = new FileOutputStream(new File("database_phone.txt"));
			ObjectOutputStream  o2 = new ObjectOutputStream (f2);
			FileOutputStream f3 = new FileOutputStream(new File("database_component.txt"));
			ObjectOutputStream  o3 = new ObjectOutputStream (f3);
			
			o1.writeObject(houseDB);
			o2.writeObject(phoneAddrDB);
			o3.writeObject(deviceDB);

			
			o1.close();
			f1.close();
			o2.close();
			f2.close();
			o3.close();
			f3.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * Reads the databasefiles database_house.txt, database_phone.txt and database_component.txt.
	 * @throws IOException If the files are unavailable it throws an error.
	 */
	@SuppressWarnings("unchecked")
	public void readDatabaseFiles() throws IOException
	{	    
		FileInputStream fileInput1 = new FileInputStream(new File("database_house.txt"));
		ObjectInputStream inputStream1 = new ObjectInputStream(fileInput1);
		FileInputStream fileInput2 = new FileInputStream(new File("database_phone.txt"));
		ObjectInputStream inputStream2 = new ObjectInputStream(fileInput2);
		FileInputStream fileInput3 = new FileInputStream(new File("database_component.txt"));
		ObjectInputStream inputStream3 = new ObjectInputStream(fileInput3);

		// Read objects
		try {
			houseDB = (DatabaseArrayList<House>) inputStream1.readObject();
			phoneAddrDB = (DatabaseArrayList<PhoneAddress>) inputStream2.readObject();
			deviceDB = (DatabaseArrayList<Component>) inputStream3.readObject();

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		fileInput1.close();
		inputStream1.close();
		fileInput2.close();
		inputStream2.close();
		fileInput3.close();
		inputStream3.close();
	}
}
