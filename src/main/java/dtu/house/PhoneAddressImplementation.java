package dtu.house;

import dtu.house.HouseID;

public class PhoneAddressImplementation implements PhoneAddress
{
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
