package dtu.components;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import dtu.house.HouseID;

/**
 * The component device, originally intended to be one type of device, in its current state it encomppases more.
 */
public class ComponentSignal implements Component, Serializable
{
	private static final long serialVersionUID = 3930834081472801135L;
	private ComponentID id;
	private HouseID houseID;
	private LocalDateTime date;
	private LocalDate firstMessageOfTheDay;
	private int dailyMessageCount = 0;
	
	/**
	 * Create a component using the TTN identifier and the houseID for house to which it belongs
	 * @param id
	 * @param houseID
	 */
	public ComponentSignal(String id, HouseID houseID)
	{
		this.id = new ComponentIDValue(id);
		this.houseID = houseID;
		this.firstMessageOfTheDay = LocalDate.now();
	}
	
	/**
	 * Returns the component ID for the device
	 */
	public ComponentID getComponentID()
	{
		return id;
	}
	/**
	 * Return sthe houseID for the device
	 */
	public HouseID getHouseID()
	{
		return houseID;
	}
	
	/**
	 * Get the type of alarm
	 */
	public DeviceEnum getComponentType()
	{
		return DeviceEnum.SIGNAL_ALARM;
	}
	
	/**
	 * Return the last time the component was seen
	 */
	public LocalDateTime getLastSignalDate()
	{
		return date;
	}
	
	/**
	 * Set the last time this object was seen.
	 */
	public void updateLastDate(LocalDateTime date)
	{
		this.date = date;
	}


	/**
	 * Set the first time this device recieved a message
	 */
	public void setFirstMessageTime(LocalDate firstMessageOfTheDay) {
		this.firstMessageOfTheDay = firstMessageOfTheDay;
	}
	
	/**
	 * Get how many messages were recieved today.
	 */
	public int getDailyMessageCount() {
		return dailyMessageCount;
	}
	
	/**
	 * Set the amount of messages recieved.s
	 */
	public void updateDailyMessageCount(int newVal) {
		dailyMessageCount = newVal;
	}

	/**
	 * Get the first time a message was sent today.
	 */
	public LocalDate getFirstMessageTime() {
		return firstMessageOfTheDay;
	}
}
