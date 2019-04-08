package dtu.alarmSystemBackend;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.Writer;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.Optional;
import java.util.function.Predicate;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.thethingsnetwork.data.common.Connection;
import org.thethingsnetwork.data.mqtt.Client;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import org.thethingsnetwork.data.common.messages.ActivationMessage;
import org.thethingsnetwork.data.common.messages.DataMessage;
import org.thethingsnetwork.data.common.messages.DownlinkMessage;

import dtu.components.Component;
import dtu.database.Database;
import dtu.database.PhoneAddress;
import dtu.house.House;
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
	
	private Gson gson;
	
	Client client;
	
	public static void main(String[] args) throws MqttException, Exception
	{
		new Main();

	}
		
	public Main() throws MqttException, Exception
	{
		gson = new GsonBuilder().create();
		try {
			readDatabaseFiles();
		} catch (IOException e)
		{
			System.out.println("Failed to setup database files - program failed");
			e.printStackTrace();
			return;
		}
		try {
			clientSetup();
		} catch (URISyntaxException e) {
			e.printStackTrace();
			System.out.println("Failed to setup communication - program failed");
			return;
		}
		while(true)
		{
			System.out.print(".");
			Thread.sleep(1000);		
		}
		
	}
	
	
	/**
	 * Reads the databasefiles HouseDB.json, DeviceDB.json and PhoneAddrDB.json.
	 * @throws IOException If the files are unavailable it throws an error.
	 */
	public void readDatabaseFiles() throws IOException
	{
	    Gson gson = new GsonBuilder().create();
	    
	    File file = new File("HouseDB.json");
	    file.createNewFile();
	    Writer writer = new FileWriter(file);
	    gson.toJson(houseDB, writer);
		writer.close();
		
	    file = new File("DeviceDB.json");
	    file.createNewFile();
		writer = new FileWriter(file);
	    gson.toJson(deviceDB, writer);
		writer.close();
		
		file = new File("PhoneAddrDB.json");
	    file.createNewFile();
		writer = new FileWriter(file);
	    gson.toJson(phoneAddrDB, writer);
		writer.close();
	}
	
	public void clientSetup() throws MqttException, Exception
	{
		client = new MSGrecver().setupRecver();

        client.onActivation((String _devId, ActivationMessage _data) -> System.out.println("Activation: " + _devId + ", data: " + _data.getDevAddr()));

        client.onError((Throwable _error) -> System.err.println("error: " + _error.getMessage()));

        client.onConnected((Connection _client) -> System.out.println("connected !"));


		//Upon getting a message, this is how its handled - handle -> converted to byte stream -> put into its container -> sent
		client.onMessage(null, (String devId, DataMessage data) -> {
			
			Optional<JsonElement> result = handleMessage(data, devId);
			
			JsonObject elem = new JsonObject();
			byte[] output = null;
			try {
				output = convertToBytes(elem);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			System.out.print("\nsending: the following ");
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
	
	private Optional<JsonElement> handleMessage(DataMessage data, String deviceID) {
		JsonObject output = new JsonObject();
		JsonObject input = gson.toJsonTree(data).getAsJsonObject();
		
        Predicate<Component> filterFunction = n -> n.getComponentID().getID().equals(deviceID);
        
        Optional<Component> optDevice = deviceDB.get(filterFunction);
        if (!optDevice.isPresent())
        {
        	return Optional.empty();
        }
        Component component = optDevice.get();
        component.updateLastDate(new Date());
        
        Predicate<House> filterFunctionHouse = n -> n.getHouseID().getID().equals(component.getHouseID().getID());
        
        Optional<House> optHouse = houseDB.get(filterFunctionHouse);
        if (!optHouse.isPresent()) //figure out how to handle this - component exists but house got deleted? Wrong house ID perhaps in DB? Indicates corruption
        {
        	return Optional.empty();
        }
        
       House house = optHouse.get();
       //Check if conflict
       boolean panicRecv = input.get("panic").getAsBoolean();
       boolean statusRecv = input.get("status").getAsBoolean();
       String pwRecv = input.get("password").getAsString();
       if (pwRecv.length() > 0)
       { // password - toggle things
    	   house.toggleArm();
    	   if (!house.isWarning())
    	   {
    		   house.toggleHouseWarn();
    		   
    	   }

       }
       else if (statusRecv && house.getArmStatus()) 
       { //ALARM START
    	   
       }
       else if (statusRecv && panicRecv)
       {
    	   
       }
       else // generic lookup
       {

       }
       output.addProperty("armStatus", house.getArmStatus());


       
       

        

		
		
		
		
		return Optional.empty();
	}

	private byte[] convertToBytes(Object object) throws IOException
	{
	    try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
	         ObjectOutput out = new ObjectOutputStream(bos))
	    {
	        out.writeObject(object);
	        return bos.toByteArray();
	    } catch (IOException e)
	    {
	    	System.out.println("convertToBytes Failed - another thread is accessing the same object.");
			e.printStackTrace();
		}
		return null;
	}
}
	
	
	
	
	
/**

    public Main() throws Exception
    {
    	Client client = new MSGrecver().setupRecver();
    	client.onConnected((Connection _client) -> System.out.println("connected !"));
        
    	try {
			client.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	

    	

    	while(true)
    	{
    		try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			//byte[] msg = {0x00};
			//
    		System.out.print(".");
    	}

    	
    	
    	
        House testHouse = new HouseImplementation("DTU 404");
        houseDB.add(testHouse);
        houseDB.add(new HouseImplementation("DTU 405"));

        Predicate<House> filterFunction = n -> n.getAddress().equals("DTU 405");
        Optional<?> newHouse = houseDB.get(filterFunction);
        System.out.println("result: " + newHouse.isPresent());
        
    }
	*/
