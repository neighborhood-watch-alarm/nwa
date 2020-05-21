package dtu.house;

import java.io.Serializable;

import dtu.house.HouseID;

public interface PhoneAddress extends Serializable
{
	public String getNumber();
	public HouseID getHouseID();

}
