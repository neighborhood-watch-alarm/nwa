package dtu.house;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public class HouseImplementation implements House, Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4110152058379289436L;
	private HouseID id;
	private int warningTime;
	private boolean armStatus = false;
	private String address;
	private LocalDateTime smsStamp;
	
	public HouseImplementation(String address, HouseID ID)
	{
		this.address = address;
		this.id = ID;
	}
	
	
	public String getAddress()
	{
		return address;
	}

	public HouseID getHouseID() 
	{
		return id;
	}

	public boolean getArmStatus()
	{
		return armStatus;
	}

	public void toggleArm()
	{
		armStatus = !armStatus;
	}


	public int getWarningTime() {
		return warningTime;
	}
	
	public void setHouseTime(int value)
	{
		warningTime = value;
	}
	
	public void modifyWarningTime(int value) {
		warningTime += value;
		
	}


	public void smsSent(LocalDateTime date) {
		smsStamp = date;
		
	}

	public LocalDateTime getSMSTimestamp() {
		return smsStamp;
	}


}
