package dtu.components;

import java.io.Serializable;

/**
 * The base component ID value objects
 */
public class ComponentIDValue implements ComponentID, Serializable
{
	/**
	 * Serial ID auto generated.
	 */
	private static final long serialVersionUID = 1879802809013910787L;
	private String value;
	
	public ComponentIDValue(String value)
	{
		this.value = value;
	}


	/**
	 * Returns the value of the ID
	 */
	public String getID()
	{
		return value;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((value == null) ? 0 : value.hashCode());
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
		ComponentIDValue other = (ComponentIDValue) obj;
		if (value == null) {
			if (other.value != null)
				return false;
		} else if (!value.equals(other.value))
			return false;
		return true;
	}
	

}
