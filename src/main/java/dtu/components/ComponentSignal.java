package dtu.components;

import java.io.Serializable;
import java.time.LocalDateTime;

import dtu.house.HouseID;

public class ComponentSignal implements Component, Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3930834081472801135L;
	private ComponentID id;
	private HouseID houseID;
	private LocalDateTime date;
	
	public ComponentSignal(String id, HouseID houseID)
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
	
	public LocalDateTime getLastSignalDate()
	{
		return date;
	}
	
	public void updateLastDate(LocalDateTime date)
	{
		this.date = date;
	}

}
