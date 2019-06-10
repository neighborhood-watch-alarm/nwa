package dtu.components;

import java.io.Serializable;
import java.time.LocalDate;
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
	private LocalDate firstMessageOfTheDay;
	private int dailyMessageCount = 0;
	
	public ComponentSignal(String id, HouseID houseID)
	{
		this.id = new ComponentIDValue(id);
		this.houseID = houseID;
		this.firstMessageOfTheDay = LocalDate.now();
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



	public void setFirstMessageTime(LocalDate firstMessageOfTheDay) {
		this.firstMessageOfTheDay = firstMessageOfTheDay;
	}
	
	public int getDailyMessageCount() {
		return dailyMessageCount;
	}
	
	public void updateDailyMessageCount(int newVal) {
		dailyMessageCount = newVal;
	}



	public LocalDate getFirstMessageTime() {
		return firstMessageOfTheDay;
	}



}
