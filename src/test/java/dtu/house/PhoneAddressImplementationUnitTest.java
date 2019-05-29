package dtu.house;

import static org.junit.Assert.assertEquals;

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
public class PhoneAddressImplementationUnitTest 
{
	PhoneAddress phoneAddr;
	@Mock
	HouseID id;
	
    @Rule public MockitoRule mockitoRule = MockitoJUnit.rule(); 

    @Before
    public void init()
    {
    	phoneAddr = new PhoneAddressImplementation("testNumber", id);
    }
	
	@Test
	public void testCreate()
	{
		new PhoneAddressImplementation("testNumber", id);
	}
	
	@Test
	public void testGetNumber()
	{
		String expectedResult = "testNumber";
		String result = phoneAddr.getNumber();
		assertEquals(result, expectedResult);
	}
	
	@Test
	public void testGetHouseID()
	{
		HouseID result = phoneAddr.getHouseID();
		assertEquals(result, id);
	}
	
	
	
	

	
}
