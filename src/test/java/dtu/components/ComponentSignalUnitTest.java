package dtu.components;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.*;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;


import dtu.database.DatabaseArrayList;
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
	
	@Test
	public void getLastSignalDate()
	{
		LocalDateTime resultingDate = component.getLastSignalDate();
		assertNull(resultingDate);
	}
	
	@Test
	public void updateLastDate()
	{
		LocalDateTime newTime = LocalDateTime.MAX;
		component.updateLastDate(newTime);
		LocalDateTime resultingTime = component.getLastSignalDate();
		assertEquals(resultingTime, newTime);
	}
	
	
	
	
	

	
}
