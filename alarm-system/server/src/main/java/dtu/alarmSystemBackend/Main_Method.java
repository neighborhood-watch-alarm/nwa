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
import java.time.LocalDate;
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

import dtu.exampleFile.SetupExample;;

/**
 * The runner class for the NWS
 */
public class Main_Method 
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
	
	//How much time between cooldown periods of SMS
	//Daily Limit on how many messages can be sent on downlink per day per device. 
	//TTN requires that you utilize less than 10 per day, others might require less.
	private final int DAILYMESSAGELIMIT = 30 *  60 * 1000;
	
	private Gson gson;
	private Client client;
	
	
	/**
	 * Starts the program
	 * @param args
	 * @throws MqttException
	 * @throws Exception
	 */
	public static void main(String[] args) throws MqttException, Exception
	{
		//SetupExample.testing(args); //UNCOMMENT TO REFRESH DATABASE
		new Main_Method();
	}
	

	/**
	 * Starts the setup and listens for incoming messages and expiring alarms.
	 * @throws MqttException
	 * @throws Exception
	 */
	public Main_Method() throws MqttException, Exception
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
	
	/**
	 * Initial setup and cleanup of the devices
	 * @throws MqttException
	 * @throws Exception
	 */
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
		sender = new SMSSenderBash();		
		try {
			clientSetup();
		} catch (URISyntaxException e) {
			e.printStackTrace();
			System.out.println("Failed to setup communication - program failed");
		}
	}

	/**
	 * Iterates over the list of warning houses on whether if any alarms have expired or not.
	 * @param warning
	 */
	private void alarmHouses(HashSet<House> warning)
	{
		for (House house : warning)
		{
			house.modifyWarningTime(-1);
			if (house.getWarningTime() <= 0 && !house.getArmStatus())
			{	
				house.modifyWarningTime(-1);
				house.setSMSsentTimestamp(LocalDateTime.now());
				alarm(house);					
			}
		}
		warning.removeIf(house -> house.getWarningTime() <= 0 || !house.getArmStatus());
	}
	
	/**
	 * Setups the TTN connection in regards to how handling should be done
	 * @throws MqttException
	 * @throws Exception
	 */
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
	
	/**
	 * The consumer for a message. Handles the way that messages are recieved, and in certain cases returns a downlink message to the TTN.
	 * @return
	 */
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
	
	/**
	 * Transmit a message to the TTN
	 * @param elem
	 * @param devId
	 */
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


	/**
	 * Take the payload files from the json object.	
	 * @param data
	 * @param gson
	 * @return
	 */
	public JsonObject readPayLoad(JsonObject data, Gson gson) 
	{
		return  gson.toJsonTree(data.get("payloadFields")).getAsJsonObject();
	}
	
	/**
	 * Handle the request found in the message based on the payload
	 * @param data
	 * @param deviceID
	 * @return
	 */
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
        
        Component device = optDevice.get();
        Predicate<House> filterFunctionHouse = n -> n.getHouseID().getID().equals(device.getHouseID().getID());
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
 
       System.out.println("\npanic: " + panicRecv);
       System.out.println("status: " + statusRecv);
       System.out.println("armStatus: " + deviceArmStatus);
       System.out.println("password: ");
       for (int i = 0; i < pw.length; i++)
       {
    	   System.out.print(pw[i] + " ");
       }
       System.out.println("\nHouse Arm Status: " + house.getArmStatus());
       if (Arrays.stream(pw).sum() > 0)
       {
    	   if (device.getDailyMessageCount() > 9)
    	   {
    		   return Optional.empty();
    	   }
    	   int counter = input.get("counter").getAsInt();
    	   if (handlePW(house, counter, pw) && !dailyMessageLimitReached(device))
    	   {
    		   System.out.println("Login succeeded");
    		   handleLogin(output, house);
    		   return Optional.of(output);
    	   }
    	   else
    	   {
    		   System.out.println("login failed");
    	   }
       }
       else if (/*statusRecv &&*/ panicRecv)
       {
    	   alarm(house);
       }
       else if (statusRecv && house.getArmStatus()) 
       {
    	   handleStartAlarm(house);
       }
       else if (deviceArmStatus != house.getArmStatus() && !dailyMessageLimitReached(device))
       {
           output.addProperty("armStatus", house.getArmStatus());
           return Optional.of(output);
       }
       return Optional.empty();
	}
	
	/**
	 * Checks whether the device has reached the daily message limit for the TTN.
	 * @param device
	 * @return
	 */
	public boolean dailyMessageLimitReached(Component device)
	{
		LocalDate daily = device.getFirstMessageTime();
		LocalDate now = LocalDate.now();
		int messageCount = device.getDailyMessageCount();
		if (Duration.between(daily.atStartOfDay(), now.atStartOfDay()).toDays() >= 1)
		{
			device.setFirstMessageTime(now);
			messageCount = 0;
			return false;
		}
		else
		{
			messageCount = messageCount + 1;
		}
		device.updateDailyMessageCount(messageCount);
		return messageCount >= DAILYMESSAGELIMIT;
	}
	
	
	/**
	 * Adds a house to warning houses and starts an alarm after the duration if no backoff period exists. 
	 * @param house
	 */
	private void handleStartAlarm(House house) {
		if (houseNoBackoffPeriodExists(house)) {
			warningHouses.add(house);
			house.setWarningTime(alarmTime);
		}
	}

	/**
	 * On a login handle the parameters as needed.
	 * @param output
	 * @param house
	 */
	private void handleLogin(JsonObject output, House house)
	{
		 house.toggleArm();
		 output.addProperty("armStatus", house.getArmStatus());	
		 HouseID id = house.getHouseID();
		 List<Component> deviceList = deviceDB.filter(device -> device.getHouseID().equals(id));
		 for (Component device : deviceList)
		 {
				device.updateLastDate(null);
		 }
	}


	/**
	 * Check if a password is the correcto one for a house.
	 * @param house
	 * @param counter
	 * @param password
	 * @return
	 */
	private boolean handlePW(House house, int counter, int[] password) {
 	   byte[] salt = house.getSalt();
 	   salt[15] = (byte) counter;
 	   salt[14] = (byte) (counter >> 8);
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
 		   if (int1 != password[i])
 		   {
 			   return false;
 		   }
 	   }

		return true;
	}

	/**
	 * Check if there is a backoff period or not
	 * @param house
	 * @return
	 */
	public boolean houseNoBackoffPeriodExists(House house)
	{
		//If no backup period it returns true, if there is it returns false
		return (timeBetweenSMS <= 0) ? true : checkNoHouseBackoffPeriod(house);
	}
	
	/**
	 * Check if the houses backoff period is expired or not.
	 * @param house
	 * @return
	 */
	public boolean checkNoHouseBackoffPeriod(House house)
	{
		return house.getSMSTimestamp() == null || house.getSMSTimestamp() != null && Duration.between(LocalDateTime.now(), house.getSMSTimestamp()).toMillis() >= timeBetweenSMS;
	}

	/**
	 * Take the content of a json file and turn it into byte array.
	 * If a given value is false it is set to 0x01 and if true 0x02
	 * This is due to a buffer problem found on the nodes.
	 * @param input
	 * @return
	 */
	private byte[] convertToBytes(JsonObject input)
	{
		byte[] out = new byte[3];		
		if (input.has("armStatus") && input.get("armStatus").getAsBoolean())
		{
			out[0] = 0x02;
		}
		else
		{
			out[0] = 0x01;

		}
		if (input.has("panic") && input.get("panic").getAsBoolean())
		{
			out[1] = 0x02;
		}
		else
		{
			out[1] = 0x01;
		}
		if (input.has("status") && input.get("status").getAsBoolean())
		{
			out[2] = 0x02;
		}
		else
		{
			out[2] = 0x01;
		}
		return out;
	}
	
	/**
	 * Save the content of the databases down to some files
	 */
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
	
	/**
	 * Check if any devices havnt been seen in certain period of times, and if so combine them for each house.	
	 */
	private void checkDevices() 
	{
		LocalDateTime now = LocalDateTime.now();
		//Filter if a device exceeds the limits set for its last seen time
		List<Component> devices = deviceDB.filter(device ->  device.getLastSignalDate() != null
					&& Duration.between(now, device.getLastSignalDate()).toMillis() > lastSeen);
		
		//Combine those message if such exist, we do not want 2 messages about the same house for different devices
		Hashtable<HouseID, List<ComponentID>> hashtable = new Hashtable<HouseID, List<ComponentID>>();
		for (Component device : devices)
		{ 
			checkDevicesHashtable(device.getComponentID(), device.getHouseID(), hashtable);
		}
		//For each of them that exist, check if they dont have a backoff period
		List<House> houses = houseDB.filter(house -> hashtable.containsKey(house.getHouseID()) && houseNoBackoffPeriodExists(house));
		for (House house : houses)
		{
			handleHouseFailureDeviceMsg(house, hashtable);
		}		
	}
	


	/**
	 * Transmit the failure depending on the house arming status
	 * @param house
	 * @param hashtable
	 */
	private void handleHouseFailureDeviceMsg(House house, Hashtable<HouseID, List<ComponentID>> hashtable)
	{
		if (house.getArmStatus())
		{
			house.setWarningTime(alarmTime);
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
			house.setWarningTime(alarmTime);
			sendMsg(numbers, sb.toString());
		}
		
	}

	/**
	 * Add the house to a hashtable.
	 * @param deviceID
	 * @param houseID
	 * @param hashtable
	 */
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
	
	/**
	 * Transmit an alarm
	 * @param house
	 */
	public void alarm(House house)
	{
		List<PhoneAddress> numbers = phoneAddrDB.filter(phone -> phone.equals(phone));
		String content = "Hey everyone, there was a breakin at " + house.getAddress() + " please respond quickly.";
		sendMsg(numbers, content);
	}
	
	/**
	 * Send a message to a list of given number
	 * @param numbers
	 * @param msg
	 */
	public void sendMsg(List<PhoneAddress> numbers, String msg)
	{
		for (PhoneAddress number : numbers)
		{
			sender.sendToNumber(number.getNumber(), msg);
		}
	}
}
