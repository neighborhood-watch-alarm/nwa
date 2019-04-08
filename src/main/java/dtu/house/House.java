package dtu.house;

public interface House
{
	public String getAddress();
	public HouseID getHouseID();
	public boolean getArmStatus();	
	public void toggleArm();
	public void toggleHouseWarn();
	public int getWarningTime();
	public void modifyWarningTime(int value);
	public void setHouseTime(int value);

}
