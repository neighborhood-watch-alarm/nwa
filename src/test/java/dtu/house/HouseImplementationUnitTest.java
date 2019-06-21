package dtu.house;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;



/**
 * These tests are unit tests
 * @author s164166
 *
 */
public class HouseImplementationUnitTest 
{
	House house;
	@Mock
	HouseID id;
	
    @Rule public MockitoRule mockitoRule = MockitoJUnit.rule(); 

    @Before
    public void init()
    {
    	house = new HouseImplementation("12345 whitehouse", id, "1234", null);
    }
	
	@Test
	public void testCreate()
	{
		new HouseImplementation("12345 whitehouse", id, "1234", null);
	}
	
	@Test
	public void testGetAddress()
	{
		String expectedResult = "12345 whitehouse";
		String result = house.getAddress();
		assertEquals(result, expectedResult);
	}
	
	@Test
	public void testGetHouseID()
	{
		HouseID result = house.getHouseID();
		assertEquals(result, id);
	}	
	
	@Test
	public void testGetArmStatus()
	{
		boolean result = house.getArmStatus();
		assertFalse(result);
	}
	
	@Test
	public void testToggleArm()
	{
		house.toggleArm();
		boolean result = house.getArmStatus();
		assertTrue(result);
	}
	
	@Test
	public void testToggleArmTwice()
	{
		house.toggleArm();
		house.toggleArm();
		boolean result = house.getArmStatus();
		assertFalse(result);
	}
	
	@Test
	public void testGetWarningTime()
	{
		int expected = 0;
		int result = house.getWarningTime();
		assertEquals(result, expected);
	}
	
	@Test
	public void testSetHouseTime()
	{
		int expected = 99;
		house.setWarningTime(expected);
		int result = house.getWarningTime();
		assertEquals(result, expected);
	}
	
	@Test
	public void testMofiyWarningTime()
	{
		int expected = 100;
		house.modifyWarningTime(expected/2);
		house.modifyWarningTime(expected/2);
		int result = house.getWarningTime();
		assertEquals(result, expected);
	}

}
