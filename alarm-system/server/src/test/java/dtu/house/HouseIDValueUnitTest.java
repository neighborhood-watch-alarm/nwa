package dtu.house;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * These tests are unit tests
 * @author s164166
 *
 */
public class HouseIDValueUnitTest 
{
	HouseID id;

	
	@Test
	public void testCreate()
	{
		new HouseIDValue("tempID");
	}
	
	@Test
	public void getAddress()
	{
		String expected = "tempID";
		id = 		new HouseIDValue(expected);
		String result = id.getID();
		assertEquals(result, result);
	}
	
	@Test
	public void hashCodeTest()
	{
		int expectedResult = -380428068;
		id = 		new HouseIDValue("Temp Addr");
		int result = id.hashCode();
		assertEquals(result, expectedResult);				
	}
	
	@Test
	public void hashCodeTestAddressNull()
	{
		int expectedResult = 31;
		id = 		new HouseIDValue(null);
		int result = id.hashCode();
		assertEquals(result, expectedResult);				
	}
	
	@Test
	public void equalsTestSame()
	{
		id = 		new HouseIDValue("Temp Addr");
		boolean result = id.equals(id);
		assertTrue(result);			
	}
	
	@Test
	public void equalsTestNull()
	{
		id = 		new HouseIDValue("Temp Addr");
		boolean result = id.equals(null);
		assertFalse(result);			
	}
	
	@Test
	public void equalsDiffClass()
	{
		id = 		new HouseIDValue("Temp Addr");
		Integer value =  5;
		boolean result = id.equals(value);
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButAddressIsNull()
	{
		id = 		new HouseIDValue(null);
		boolean result = id.equals(new HouseIDValue("Temp Addr"));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButOtherAddressIsNull()
	{
		id = 		new HouseIDValue("Temp Addr");
		boolean result = id.equals(new HouseIDValue(null));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButBothNull()
	{
		id = 		new HouseIDValue(null);
		boolean result = id.equals(new HouseIDValue(null));
		assertTrue(result);			
	}
	
	@Test
	public void equalEachOtherButDifferentObject()
	{
		id = 		new HouseIDValue("Temp Addr");
		boolean result = id.equals(new HouseIDValue("Temp Addr"));
		assertTrue(result);			
	}
	
	@Test
	public void equalsOtherObjectDiffAddress()
	{
		id = 		new HouseIDValue("Temp Addr");
		boolean result = id.equals(new HouseIDValue("Temp Addr2"));
		assertFalse(result);			
	}
	
	

	
}
