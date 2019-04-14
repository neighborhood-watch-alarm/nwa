package dtu.components;

import java.util.Date;

import dtu.house.HouseID;

public class ComponentSignal implements Component
{
	private ComponentID id;
	private HouseID houseID;
	private Date date;
	
	public ComponentSignal(int id, HouseID houseID)
	{
		this.id = new ComponentIDValue(id);
		this.houseID = houseID;
	}
	
	public ComponentID getComponentID()
	{
		return id;
	}
	public HouseID getHouseID()
	{
		return houseID;
	}
	
	public DeviceEnum getComponentType()
	{
		return DeviceEnum.SIGNAL_ALARM;
	}
	
	public Date getLastSignalDate()
	{
		return date;
	}
	
	public void updateLastDate(Date date)
	{
		this.date = date;
	}

}
