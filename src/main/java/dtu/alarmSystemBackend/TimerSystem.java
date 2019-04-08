package dtu.alarmSystemBackend;

import java.util.ArrayList;

import dtu.database.Database;
import dtu.database.PhoneAddress;
import dtu.house.House;

public class TimerSystem implements Runnable
{
	public ArrayList<House> warningHouses;
	public Alarm alarm;
	@Override
	public void run()
	{
		while(true)
		{

			warningHouses.removeIf(house -> !house.isWarning());

			for (House house : warningHouses)
			{
				house.modifyWarningTime(-1);
				if (house.getWarningTime() == 0)
				{
					//ALARM
					house.modifyWarningTime(60);
				}
			}
			
			System.out.println("hello");
			try
			{
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
		
	}
	
	public void init(Database<PhoneAddress> phoneNumbers)
	{
		warningHouses = new ArrayList<House>();
		alarm = new Alarm(phoneNumbers);
	}
	

}
