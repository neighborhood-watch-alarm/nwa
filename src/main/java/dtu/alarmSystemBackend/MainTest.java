package dtu.alarmSystemBackend;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.function.Predicate;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.thethingsnetwork.data.mqtt.Client;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import org.thethingsnetwork.data.common.messages.DataMessage;

import dtu.components.Component;
import dtu.components.ComponentSignal;
import dtu.database.Database;
import dtu.database.DatabaseArrayList;
import dtu.house.House;
import dtu.house.HouseImplementation;
import dtu.house.PhoneAddress;
import dtu.house.PhoneAddressImplementation;

/**
 * Hello world!
 *
 */
public class MainTest 
{
	private Database<House> houseDB;
	private Database<Component> deviceDB;
	private Database<PhoneAddress> phoneAddrDB;
	private ArrayList<House> warningHouses = new ArrayList<House>();
	private Alarm alarm;
	
	
	private Gson gson;
	private TimerSystem timerSystem;
	private Client client;
	
	
	public static void main(String[] args) throws MqttException, Exception
	{
		new MainTest();

	}
		
	public MainTest() throws MqttException, Exception
	{
		houseDB = new DatabaseArrayList<House>();
		deviceDB = new DatabaseArrayList<Component>();
		phoneAddrDB = new DatabaseArrayList<PhoneAddress>();
		
		House house = new HouseImplementation("Test Address");
		House house2 = new HouseImplementation("Test Address 2");
		houseDB.add(house);
		houseDB.add(house2);
		
		PhoneAddress phone1 = new PhoneAddressImplementation("22932970", house);
		phoneAddrDB.add(phone1);
		
		PhoneAddress phone2 = new PhoneAddressImplementation("22932970", house2);
		phoneAddrDB.add(phone2);
		
		Component device1 = new ComponentSignal(deviceDB.size(), house.getHouseID());
		device1.updateLastDate(new Date());
		deviceDB.add(device1);
		
		Component device2 = new ComponentSignal(deviceDB.size(), house.getHouseID());
		device2.updateLastDate(new Date());

		deviceDB.add(device2);
		
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
	
}
