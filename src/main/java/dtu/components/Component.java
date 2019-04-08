package dtu.components;

import java.util.Date;

import dtu.house.HouseID;

public interface Component
{
	public ComponentID getComponentID();
	public HouseID getHouseID();
	public DeviceEnum getComponentType();
	public Date getLastSignalDate();
	public void updateLastDate(Date date);

}
