package dtu.alarmSystemBackend;

import dtu.database.Database;
import dtu.house.House;
import dtu.house.PhoneAddress;
import dtu.smsComm.SMSSender;
import dtu.smsComm.SMSSenderBash;

public class Alarm
{

	Database<PhoneAddress> phoneNumbers;
	SMSSender sender = new SMSSenderBash();
	public Alarm(Database<PhoneAddress> phoneNumbers)
	{
		this.phoneNumbers = phoneNumbers;
	}
	
	public void alarm(House house)
	{
		sender.sendToAll("Hey everyone, there was a breakin at " + house.getAddress() + " please respond quickly.");
	}
	

}
