package dtu.database;

public class AddressValue implements Address
{
	private String address;
	
	public AddressValue(String address)
	{
		this.address = address;
	}

	public String getAddress() {
		return address;
	}
	

}
