package dtu.components;

import java.io.Serializable;

public class ComponentIDValue implements ComponentID, Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1879802809013910787L;
	private String value;
	
	public ComponentIDValue(String value)
	{
		this.value = value;
	}


	public String getID()
	{
		return value;
	}
	

}
