package dtu.house;

import java.io.Serializable;

public interface House extends Serializable
{
	public String getAddress();
	public HouseID getHouseID();
	public boolean getArmStatus();	
	public void toggleArm();
	public int getWarningTime();
	public void modifyWarningTime(int value);
	public void setHouseTime(int value);

}
