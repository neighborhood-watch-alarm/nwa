package dtu.database;

import java.util.Date;

public interface Component
{
	public ComponentID getComponentID();
	public HouseID getHouseID();
	public DeviceEnum getComponentType();
	public Date getLastSignalDate();
	public void updateLastDate(Date date);

}
