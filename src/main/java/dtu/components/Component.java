package dtu.components;

import java.time.LocalDate;
import java.time.LocalDateTime;

import dtu.house.HouseID;

public interface Component
{
	public ComponentID getComponentID();
	public HouseID getHouseID();
	public DeviceEnum getComponentType();
	public LocalDateTime getLastSignalDate();
	public void updateLastDate(LocalDateTime localDateTime);
	public LocalDate getFirstMessageTime();
	public void setFirstMessageTime(LocalDate localDate);
	public int getDailyMessageCount();
	public void updateDailyMessageCount(int newVal);
	
}
