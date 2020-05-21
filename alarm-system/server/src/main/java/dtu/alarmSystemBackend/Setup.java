package dtu.alarmSystemBackend;

import java.util.List;

import dtu.components.Component;
import dtu.database.Database;
import dtu.house.House;

/**
 * Some basic setup structure for the arm status and the devices
 */
public class Setup {

	/**
	 * Reset the value
	 * @param deviceDB
	 */
	public void resetAlarmLastSeen(Database<Component> deviceDB)
	{
		List<Component> devices = deviceDB.filter(device -> device.equals(device));
		for (Component device : devices)
		{
			device.updateLastDate(null);
		}
	}
	
	/**
	 * Resets the values for the arm status on startup.
	 * @param houseDB
	 */
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
