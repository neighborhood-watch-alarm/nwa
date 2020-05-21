package dtu.house;

import java.io.Serializable;

import dtu.house.HouseID;

public class PhoneAddressImplementation implements PhoneAddress, Serializable
{

	private static final long serialVersionUID = 3549641719780977811L;
	private String number;
	private HouseID id;
	/**
	 * Ties a number together with a houseID
	 * @param phoneNumber
	 * @param id
	 */
	public PhoneAddressImplementation(String phoneNumber, HouseID id)
	{
		number = phoneNumber;
		this.id = id;
	}
	
	/**
	 * Get the number belonging to this phoneAddress
	 */
	public String getNumber()
	{
		return number;
	}
	
	/**
	 * Get the id of the house
	 */
	public HouseID getHouseID()
	{
		return id;
	}

}
