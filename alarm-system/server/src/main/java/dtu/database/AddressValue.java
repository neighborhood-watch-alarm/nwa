package dtu.database;

import java.io.Serializable;

/**
 * Address value object.
 */
public class AddressValue implements Address, Serializable
{
	private static final long serialVersionUID = 2225477654290052063L;
	private String address;
	
	public AddressValue(String address)
	{
		this.address = address;
	}

	public String getAddress() {
		return address;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AddressValue other = (AddressValue) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		return true;
	}
	

}
