package dtu.alarmSystemBackend;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.URISyntaxException;
import java.nio.ByteBuffer;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Predicate;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.thethingsnetwork.data.mqtt.Client;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import au.com.forward.sipHash.SipHash_2_4;

import org.thethingsnetwork.data.common.messages.DataMessage;
import org.thethingsnetwork.data.common.messages.DownlinkMessage;

import dtu.components.Component;
import dtu.components.ComponentID;
import dtu.database.Database;
import dtu.database.DatabaseArrayList;
import dtu.house.House;
import dtu.house.HouseID;
import dtu.house.PhoneAddress;
import dtu.smsComm.SMSSender;
import dtu.smsComm.SMSSenderBash;
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
	private HashSet<House> warningHouses = new HashSet<House>();
	private SMSSender sender;
	private SipHash_2_4 hash = new SipHash_2_4();

	//Amount of seconds from when an alarm spots someone till it goes off.
	private int alarmTime = 60;
	//How many seconds between each seen is allowed per split.
	private long lastSeen = 300 * 1000;
	//How much time between cooldown periods of SMS
	//If this value is set to -1, then only 1 sms can be sent.
	private long timeBetweenSMS = 30 *  60 * 1000;
	
	private Gson gson;
	private Client client;
	
	
	public static void main(String[] args) throws MqttException, Exception
	{
		new Main();
	}
	

	public Main() throws MqttException, Exception
	{
		setup();
		while(true)
		{
			System.out.print(".");
			alarmHouses(warningHouses);
			checkDevices();
			Thread.sleep(1000);		
		}
	}	
	
	public void setup() throws MqttException, Exception
	{
		gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			readDatabaseFiles();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		Setup setup = new Setup();
		
		//Some cleanup.
		setup.resetHouseArm(houseDB);
		setup.resetAlarmLastSeen(deviceDB);
		//Setup new transmitSms
		sender = new SMSSenderBash(phoneAddrDB);		
		try {
			clientSetup();
		} catch (URISyntaxException e) {
			e.printStackTrace();
			System.out.println("Failed to setup communication - program failed");
		}
	}

	
	private void alarmHouses(HashSet<House> warning)
	{
		for (House house : warning)
		{
			house.modifyWarningTime(-1);
			if (house.getWarningTime() <= 0 && !house.getArmStatus())
			{	
				house.modifyWarningTime(-1);
				house.smsSent(LocalDateTime.now());
				alarm(house);					
			}
		}
		warning.removeIf(house -> house.getWarningTime() <= 0 || !house.getArmStatus());
	}
	
	public void clientSetup() throws MqttException, Exception
	{
		MSGrecver TTNconnector = new MSGrecver();
		client = TTNconnector.setupRecver();
		
        client.onActivation(TTNconnector.onActivationSetup());
        client.onError(TTNconnector.onErrorSetup());
        
        client.onConnected(TTNconnector.onConnectionSetup());


		//Upon getting a message, this is how its handled - handle -> converted to byte stream -> put into its container -> sent
		client.onMessage(null, onMessageSetup());
		client.start();
	}
	
	public BiConsumer<String, DataMessage>  onMessageSetup()
	{
		BiConsumer<String, DataMessage> var = (String devId, DataMessage data) -> {
			Optional<JsonObject> result = handleRequest(data, devId);

			if (result.isPresent()) {

				transmitMessage(result.get(), devId);
			}
		};
		return var;
	}
	
	private void transmitMessage(JsonObject elem, String devId) {

		byte[] output = convertToBytes(elem);
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
		
	}


	public JsonObject readPayLoad(JsonObject data, Gson gson) 
	{
		return  gson.toJsonTree(data.get("payloadFields")).getAsJsonObject();
	}
	
	private Optional<JsonObject> handleRequest(DataMessage data, String deviceID) {
		JsonObject output = new JsonObject();
		JsonObject input = gson.toJsonTree(data).getAsJsonObject();
		JsonObject payload = readPayLoad(input, gson);
		
        Predicate<Component> filterFunction = n -> n.getComponentID().getID().equals(deviceID);
        Optional<Component> optDevice = deviceDB.get(filterFunction);
        if (!optDevice.isPresent())
        {
        	return Optional.empty();
        }
        
        Component component = optDevice.get();
        Predicate<House> filterFunctionHouse = n -> n.getHouseID().getID().equals(component.getHouseID().getID());
        Optional<House> optHouse = houseDB.get(filterFunctionHouse);
        if (!optHouse.isPresent())
        {
        	return Optional.empty();
        }
        
       House house = optHouse.get();
       boolean deviceArmStatus = payload.get("armStatus").getAsInt() == 2;
       boolean panicRecv = payload.get("panic").getAsInt() == 2;
       boolean statusRecv = payload.get("status").getAsInt() == 2;
       JsonArray temp = payload.get("password").getAsJsonArray();
       int[] pw = new int[temp.size()];
       for (int i = 0; i < pw.length; i++)
       {
    	   pw[i] = temp.get(i).getAsInt();
       }
 
       
       System.out.println("panic: " + panicRecv);
       System.out.println("status: " + statusRecv);
       System.out.println("armStatus: " + deviceArmStatus);
       System.out.println("password: ");
       for (int i = 0; i < pw.length; i++)
       {
    	   System.out.print(pw[i] + " ");
       }
       System.out.println("House Arm Status: " + house.getArmStatus());
       
       if (Arrays.stream(pw).sum() > 0)
       {
    	   int counter = input.get("counter").getAsInt();
    	   if (handlePW(house, counter, pw))
    	   {
 
    		   System.out.println("Login succeeded");
    		   handleLogin(output, house);
    		   System.out.println(output);

    		   return Optional.of(output);
    	   }
    	   else
    	   {
    		   System.out.println("login failed");
    	   }
       }
       else if (statusRecv && panicRecv)
       {
    	   alarm(house);
       }
       else if (statusRecv && house.getArmStatus()) 
       {
    	   handleStartAlarm(house);
       }
       else if (deviceArmStatus != house.getArmStatus())
       {
           output.addProperty("armStatus", house.getArmStatus());
           return Optional.of(output);
       }
       
       return Optional.empty();
	}
	
	private void handleStartAlarm(House house) {
		if (!warningHouses.contains(house) && houseTimeStampCondition(house)) {
			warningHouses.add(house);
			house.setHouseTime(alarmTime);
		}
	}

	private void handleLogin(JsonObject output, House house)
	{
		 house.toggleArm();
		 output.addProperty("armStatus", house.getArmStatus());		
	}


	private boolean handlePW(House house, int counter, int[] password) {
 	   byte[] salt = house.getSalt();
 	   salt[15] = (byte) counter;
 	   salt[14] = (byte)(counter >> 8);
 	   hash.initialize(salt);
 	   char[] pw = house.getPassword().toCharArray();
 	   for (int i = 0; i < 4; i++)
 	   {
 		   hash.updateHash((byte) pw[i]);
 	   }
 	   byte[] bytesPW = SipHash_2_4.longToBytes(hash.finish());
 	   for (int i = 0; i < bytesPW.length; i++)
 	   {
 		   int int1 = bytesPW[i];
 		   if (int1 < 0)
 		   {
 			   int1 += 256;
 		   }
 		   System.out.println(int1 + " : " + password[i]);
 		   if (int1 != password[i])
 		   {
 			   System.out.println("it was fake when: " + int1);
 			  System.out.println("it was fake when: " + password[i]);
 			   return false;
 		   }
 	   }

		return true;
	}

	
	public boolean houseTimeStampCondition(House house)
	{
		return (timeBetweenSMS <= 0) ? true : checkHouseTimeStamp(house);
	}
	
	public boolean checkHouseTimeStamp(House house)
	{
		return house.getSMSTimestamp() != null && Duration.between(LocalDateTime.now(), house.getSMSTimestamp()).toMillis() >= timeBetweenSMS;
	}

	private byte[] convertToBytes(JsonObject input)
	{
		byte[] out = new byte[3];		
		if (input.has("armStatus") && input.get("armStatus").getAsBoolean())
		{
			out[0] = 0x01;
		}

		if (input.has("panic") && input.get("panic").getAsBoolean())
		{
			out[1] = 0x01;
		}
		if (input.has("status") && input.get("status").getAsBoolean())
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
	
	private void checkDevices() 
	{
		LocalDateTime now = LocalDateTime.now();
		List<Component> devices = deviceDB.filter(device ->  device.getLastSignalDate() != null
					&& Duration.between(now, device.getLastSignalDate()).toMillis() > lastSeen);
		
		Hashtable<HouseID, List<ComponentID>> hashtable = new Hashtable<HouseID, List<ComponentID>>();
		for (Component device : devices)
		{ 
			checkDevicesHashtable(device.getComponentID(), device.getHouseID(), hashtable);
		}
		
		List<House> houses = houseDB.filter(house -> hashtable.containsKey(house.getHouseID()) && houseTimeStampCondition(house));
		for (House house : houses)
		{
			handleHouseFailureDeviceMsg(house, hashtable);
		}		
	}
	


	private void handleHouseFailureDeviceMsg(House house, Hashtable<HouseID, List<ComponentID>> hashtable)
	{
		if (houseTimeStampCondition(house))
		{
			if (house.getArmStatus())
			{
				house.setHouseTime(alarmTime);
				alarm(house);
			}
			else
			{
				List<PhoneAddress> numbers = phoneAddrDB.filter(number -> number.getHouseID().equals(house.getHouseID()));
				StringBuilder sb = new StringBuilder();
				sb.append("Device failure on component: ");
				for (ComponentID id : hashtable.get(house.getHouseID()))
				{
					sb.append(id.getID());
					sb.append(", ");
				}
				sb.delete(sb.length() - 2, sb.length());
				sb.append(".");
				sendMsg(numbers, sb.toString());
			}
		}
		
	}

	private void checkDevicesHashtable(ComponentID deviceID, HouseID houseID,
			Hashtable<HouseID, List<ComponentID>> hashtable) {
		if (hashtable.containsKey(houseID))
		{
			List<ComponentID> list = hashtable.get(houseID);
			list.add(deviceID);
			hashtable.put(houseID, list);
		}
		else
		{
			ArrayList<ComponentID> list = new ArrayList<ComponentID>();
			list.add(deviceID);
			hashtable.put(houseID, list);
		}		
	}
	
	public void alarm(House house)
	{
		System.out.println("did we actually get here?");
		List<PhoneAddress> numbers = phoneAddrDB.filter(phone -> phone.equals(phone));
		String content = "Hey everyone, there was a breakin at " + house.getAddress() + " please respond quickly.";
		for (PhoneAddress number : numbers)
		{
			sender.sendToNumber(number.getNumber(), content);
		}
	}
	
	public void sendMsg(List<PhoneAddress> numbers, String msg)
	{
		for (PhoneAddress number : numbers)
		{
			sender.sendToNumber(number.getNumber(), msg);
		}
	}
}
