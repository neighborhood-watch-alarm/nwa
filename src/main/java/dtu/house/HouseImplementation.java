package dtu.house;

import java.util.UUID;

public class HouseImplementation implements House
{

	private HouseID id;
	private int warningTime;
	private boolean armStatus, warning = false;
	private String address;
	
	public HouseImplementation(String address)
	{
		this.address = address;
		id = new HouseIDValue(UUID.randomUUID().toString());
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

	public void toggleHouseWarn()
	{
		warning = !warning;
		
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



}
