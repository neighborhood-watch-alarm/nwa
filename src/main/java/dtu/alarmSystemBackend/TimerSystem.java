package dtu.alarmSystemBackend;

import java.util.ArrayList;
import java.util.concurrent.Semaphore;

import dtu.house.House;

public class TimerSystem implements Runnable
{
	private ArrayList<House> warningHouses;
	private Alarm alarm;
	private Semaphore semaphore = new Semaphore(1, true);
	@Override
	public void run()
	{
		while(true)
		{
			try {
				semaphore.acquire();
				warningHouses.removeIf(house -> !house.getArmStatus());
				semaphore.release();
				semaphore.acquire();
				for (House house : warningHouses)
				{
					house.modifyWarningTime(-1);
					if (house.getWarningTime() <= 0)
					{
						
						alarm.alarm(house);					
					}
				}
				semaphore.release();
				semaphore.acquire();
				warningHouses.removeIf(house -> house.getWarningTime() <= 0);
				semaphore.release();
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
			try
			{
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
	}
	
	public void lockWarningHouses()
	{
		try {
			semaphore.acquire();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void unlockWarningHouse()
	{
		semaphore.release();
	}
	
	public void init(Alarm alarm, ArrayList<House> warnings)
	{
		warningHouses = warnings;
		this.alarm = alarm;
	}
	

}
