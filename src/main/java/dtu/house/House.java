package dtu.house;

import java.io.Serializable;
import java.time.LocalDateTime;

public interface House extends Serializable
{
	public String getAddress();
	public HouseID getHouseID();
	public boolean getArmStatus();	
	public void toggleArm();
	public int getWarningTime();
	public void modifyWarningTime(int value);
	public void setHouseTime(int value);
	public void smsSent(LocalDateTime date);
	public LocalDateTime getSMSTimestamp();

}
