package dtu.database;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * These tests are unit tests
 * @author s164166
 *
 */
public class AddressValueUnitTest 
{
	Address address;

	
	@Test
	public void testCreate()
	{
		new AddressValue("test st 29");
	}
	
	@Test
	public void getAddress()
	{
		String expectedStreet = "test st 29";
		address = 		new AddressValue(expectedStreet);
		String resultStreet = address.getAddress();
		assertEquals(resultStreet, expectedStreet);
	}
	
	@Test
	public void hashCodeTest()
	{
		int expectedResult = -380428068;
		address = 		new AddressValue("Temp Addr");
		int result = address.hashCode();
		assertEquals(result, expectedResult);				
	}
	
	@Test
	public void hashCodeTestAddressNull()
	{
		int expectedResult = 31;
		address = 		new AddressValue(null);
		int result = address.hashCode();
		assertEquals(result, expectedResult);				
	}
	
	@Test
	public void equalsTestSame()
	{
		address = 		new AddressValue("Temp Addr");
		boolean result = address.equals(address);
		assertTrue(result);			
	}
	
	@Test
	public void equalsTestNull()
	{
		address = 		new AddressValue("Temp Addr");
		boolean result = address.equals(null);
		assertFalse(result);			
	}
	
	@Test
	public void equalsDiffClass()
	{
		address = 		new AddressValue("Temp Addr");
		Integer value = 5;
		boolean result = address.equals(value);
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButAddressIsNull()
	{
		address = 		new AddressValue(null);
		boolean result = address.equals(new AddressValue("Temp Addr"));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButOtherAddressIsNull()
	{
		address = 		new AddressValue("Temp Addr");
		boolean result = address.equals(new AddressValue(null));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButBothNull()
	{
		address = 		new AddressValue(null);
		boolean result = address.equals(new AddressValue(null));
		assertTrue(result);			
	}
	
	@Test
	public void equalEachOtherButDifferentObject()
	{
		address = 		new AddressValue("Temp Addr");
		boolean result = address.equals(new AddressValue("Temp Addr"));
		assertTrue(result);			
	}
	
	@Test
	public void equalsOtherObjectDiffAddress()
	{
		address = 		new AddressValue("Temp Addr");
		boolean result = address.equals(new AddressValue("Temp Addr2"));
		assertFalse(result);			
	}
	
	

	
}
