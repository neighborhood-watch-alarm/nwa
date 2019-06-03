package dtu.alarmSystemBackend;

import java.util.List;

import dtu.database.Database;
import dtu.house.House;
import dtu.house.PhoneAddress;
import dtu.smsComm.SMSSender;
import dtu.smsComm.SMSSenderBash;

public class Alarm
{

	Database<PhoneAddress> phoneNumbers;
	SMSSender sender = new SMSSenderBash(phoneNumbers);
	public Alarm(Database<PhoneAddress> phoneNumbers)
	{
		this.phoneNumbers = phoneNumbers;
	}
	
	public void alarm(House house)
	{
		System.out.println("did we actually get here?");
		//sender.sendToAll("Hey everyone, there was a breakin at " + house.getAddress() + " please respond quickly.");
	}
	
	public void sendMsg(List<PhoneAddress> numbers, String msg)
	{
		for (PhoneAddress number : numbers)
		{
			sender.sendToNumber(number.getNumber(), msg);
		}
	}
	

	

}
