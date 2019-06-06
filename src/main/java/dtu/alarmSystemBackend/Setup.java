package dtu.alarmSystemBackend;

import java.util.List;

import dtu.components.Component;
import dtu.database.Database;
import dtu.house.House;

public class Setup {

	public void resetAlarmLastSeen(Database<Component> deviceDB)
	{
		List<Component> devices = deviceDB.filter(device -> device.equals(device));
		for (Component device : devices)
		{
			device.updateLastDate(null);
		}
	}
	
	public void resetHouseArm(Database<House> houseDB)
	{
		List<House> houses = houseDB.filter(house -> house.equals(house));
		for (House house : houses)
		{
			if (house.getArmStatus())
				house.toggleArm();
		}
	}
	
}
