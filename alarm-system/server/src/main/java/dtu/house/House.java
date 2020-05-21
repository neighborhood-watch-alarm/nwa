package dtu.house;

import java.io.Serializable;
import java.time.LocalDateTime;

public interface House extends Serializable
{
	public String getAddress();
	public HouseID getHouseID();
	public boolean getArmStatus();	
	public void toggleArm();
	public String getPassword();
	public byte[] getSalt();
	public int getWarningTime();
	public void modifyWarningTime(int value);
	public void setWarningTime(int value);
	public void setSMSsentTimestamp(LocalDateTime date);
	public LocalDateTime getSMSTimestamp();

}
