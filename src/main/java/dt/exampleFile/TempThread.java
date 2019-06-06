package dt.exampleFile;

import java.time.Duration;
import java.time.LocalDateTime;

import dtu.components.Component;
import dtu.components.ComponentSignal;
import dtu.house.House;
import dtu.house.HouseID;
import dtu.house.HouseIDValue;
import dtu.house.HouseImplementation;
import dtu.house.PhoneAddress;
import dtu.house.PhoneAddressImplementation;

public class TempThread {

	public static void main(String[] args) throws InterruptedException
	{
		HouseID houseID = new HouseIDValue("HouseID");
	    House house = new HouseImplementation("temp addr", houseID, "1234");
	    Component device1 = new ComponentSignal("device_01", houseID);
	    Component device2 = new ComponentSignal("device_02", houseID);
	    
	    PhoneAddress phoneNumber = new PhoneAddressImplementation("22932970", houseID);
	    
	    
	}
}
