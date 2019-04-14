package dtu.components;

public class ComponentIDValue implements ComponentID
{
	private int value;
	
	public ComponentIDValue(int value)
	{
		this.value = value;
	}


	public int getID()
	{
		return value;
	}
	

}
