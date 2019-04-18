package dtu.components;

import java.time.LocalDateTime;

import dtu.house.HouseID;

public interface Component
{
	public ComponentID getComponentID();
	public HouseID getHouseID();
	public DeviceEnum getComponentType();
	public LocalDateTime getLastSignalDate();
	public void updateLastDate(LocalDateTime localDateTime);
}
