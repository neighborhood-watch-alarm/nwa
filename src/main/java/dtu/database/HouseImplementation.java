package dtu.database;

import java.util.UUID;

public class HouseImplementation implements House
{

	private HouseID id;
	private boolean armStatus;
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



}
