package dtu.exampleFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

import dtu.components.Component;
import dtu.components.ComponentSignal;
import dtu.database.Database;
import dtu.database.DatabaseArrayList;
import dtu.house.House;
import dtu.house.HouseID;
import dtu.house.HouseIDValue;
import dtu.house.HouseImplementation;
import dtu.house.PhoneAddress;
import dtu.house.PhoneAddressImplementation;

/**
 * Example setup file
 * @author Arada
 *
 */
public class SetupExample {
	
	public static void testing(String[] args) throws InterruptedException, IOException
	{
		Database<PhoneAddress> phoneAddrDB = new DatabaseArrayList<PhoneAddress>();
		Database<House> houseDB = new DatabaseArrayList<House>();
		Database<Component> deviceDB = new DatabaseArrayList<Component>();

		//Salt example for file with house and two devices
		byte[] salt = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x00, 0x00};
		HouseID houseID = new HouseIDValue("HouseID");
		House house = new HouseImplementation("temp addr", houseID, "1234", salt);
	    Component device1 = new ComponentSignal("device_01", houseID);
	    Component device2 = new ComponentSignal("device_02", houseID);
	    PhoneAddress phoneNumber = new PhoneAddressImplementation("+4529869690", houseID);
		
		houseDB.add(house);
		deviceDB.add(device1);
		deviceDB.add(device2);
		phoneAddrDB.add(phoneNumber);
		
		
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
		System.out.println("Database Setup Done");
	}
	

}
