package dtu.database;

public interface House
{
	public String getAddress();
	public HouseID getHouseID();
	public boolean getArmStatus();	
	public void toggleArm();

}
