package dtu.house;

import java.io.Serializable;

import dtu.house.HouseID;

public class PhoneAddressImplementation implements PhoneAddress, Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3549641719780977811L;
	private String number;
	private HouseID id;
	public PhoneAddressImplementation(String phoneNumber, House house)
	{
		number = phoneNumber;
		id = house.getHouseID();
	}
	
	public String getNumber()
	{
		return number;
	}
	
	public HouseID getHouseID()
	{
		return id;
	}

}
