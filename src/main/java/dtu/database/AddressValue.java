package dtu.database;

import java.io.Serializable;

public class AddressValue implements Address, Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2225477654290052063L;
	private String address;
	
	public AddressValue(String address)
	{
		this.address = address;
	}

	public String getAddress() {
		return address;
	}
	

}
