package dtu.components;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;


import dtu.database.DatabaseArrayList;

/**
 * These tests are unit tests
 * @author s164166
 *
 */
public class ComponentIDValueUnitTest 
{
	ComponentID component;

	
	@Test
	public void testCreate()
	{
		new ComponentIDValue("tempComponent");
	}
	
	@Test
	public void getAddress()
	{
		String expectedComponentID = "tempComponent";
		component = 		new ComponentIDValue(expectedComponentID);
		String resultID = component.getID();
		assertEquals(resultID, expectedComponentID);
	}
	
	@Test
	public void hashCodeTest()
	{
		int expectedResult = -380428068;
		component = 		new ComponentIDValue("Temp Addr");
		int result = component.hashCode();
		assertEquals(result, expectedResult);				
	}
	
	@Test
	public void hashCodeTestAddressNull()
	{
		int expectedResult = 31;
		component = 		new ComponentIDValue(null);
		int result = component.hashCode();
		assertEquals(result, expectedResult);				
	}
	
	@Test
	public void equalsTestSame()
	{
		component = 		new ComponentIDValue("TempDevice");
		boolean result = component.equals(component);
		assertTrue(result);			
	}
	
	@Test
	public void equalsTestNull()
	{
		component = 		new ComponentIDValue("Temp Addr");
		boolean result = component.equals(null);
		assertFalse(result);			
	}
	
	@Test
	public void equalsDiffClass()
	{
		component = 		new ComponentIDValue("Temp Addr");
		boolean result = component.equals(new Integer(5));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButValueIsNull()
	{
		component = 		new ComponentIDValue(null);
		boolean result = component.equals(new ComponentIDValue("Temp Addr"));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButOtherValueIsNull()
	{
		component = 		new ComponentIDValue("Temp Addr");
		boolean result = component.equals(new ComponentIDValue(null));
		assertFalse(result);			
	}
	
	@Test
	public void equalsOtherObjectButBothNull()
	{
		component = 		new ComponentIDValue(null);
		boolean result = component.equals(new ComponentIDValue(null));
		assertTrue(result);			
	}
	
	@Test
	public void equalEachOtherButDifferentObject()
	{
		component = 		new ComponentIDValue("Temp Addr");
		boolean result = component.equals(new ComponentIDValue("Temp Addr"));
		assertTrue(result);			
	}
	
	@Test
	public void equalsOtherObjectDiffAddress()
	{
		component = 		new ComponentIDValue("Temp Addr");
		boolean result = component.equals(new ComponentIDValue("Temp Addr2"));
		assertFalse(result);			
	}
	
	

	
}
