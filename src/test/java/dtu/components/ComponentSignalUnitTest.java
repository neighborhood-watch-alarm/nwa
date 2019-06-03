package dtu.components;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;


import dtu.house.HouseID;

/**
 * These tests are unit tests
 * @author s164166
 *
 */
public class ComponentSignalUnitTest 
{
	Component component;
	@Mock
	HouseID id;
	
    @Rule public MockitoRule mockitoRule = MockitoJUnit.rule(); 

    @Before
    public void before()
    {
    	id = Mockito.mock(HouseID.class);
    	component = new ComponentSignal("comp_ID", id);
    }
	
	@Test
	public void testCreate()
	{
		new ComponentSignal("comp_ID", id);
	}
	
	@Test
	public void getComponentID()
	{
		String expectedComponentID = "comp_ID";
		String resultID = component.getComponentID().getID();
		assertEquals(resultID, expectedComponentID);
	}
	
	@Test
	public void getHouseId()
	{
		HouseID resultID = component.getHouseID();
		assertEquals(resultID, id);
	}
	
	@Test
	public void getComponentType()
	{
		DeviceEnum deviceType = component.getComponentType();
		assertEquals(DeviceEnum.SIGNAL_ALARM, deviceType);
	}
	
	@Test
	public void getCompoenntType()
	{
		DeviceEnum deviceType = component.getComponentType();
		assertEquals(DeviceEnum.SIGNAL_ALARM, deviceType);
	}
	
}
