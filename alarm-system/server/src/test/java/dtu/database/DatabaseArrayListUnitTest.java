package dtu.database;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
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
public class DatabaseArrayListUnitTest 
{
	DatabaseArrayList<Object> db;
	@Rule public MockitoRule mockitoRule = MockitoJUnit.rule();

	@Before
	public void init()
	{
		db = new DatabaseArrayList<Object>();
	}
	
	@Test
	public void testCreate()
	{
		new DatabaseArrayList<Object>();
	}
	
	@Test
	public void sizeIsZero()
	{
		int value = db.size();
		assertEquals(value, 0);
	}
	
	@Test
	public void sizeIsOne()
	{
		db.add(1);
		int value = db.size();
		assertEquals(value, 1);
	}
	
	@Test
	public void add()
	{
		db.add(1);
	}

	
	@Test
	public void filterNoItems()
	{
		List<Object> tempList = db.filter(object -> object.equals(2));
		int value = tempList.size();
		assertEquals(value, 0);

	}
	
	@Test
	public void FilterNoItemEquals()
	{
		db.add(1);
		db.add(2);
		db.add(3);

		List<Object> tempList = db.filter(object -> object.equals(55));
		int value = tempList.size();
		assertEquals(value, 0);
	}
	
	@Test
	public void FilterOneItemEquals()
	{
		db.add(1);
		db.add(2);
		db.add(3);

		List<Object> tempList = db.filter(object -> object.equals(2));
		int value = tempList.size();
		assertEquals(value, 1);
	}
	
	@Test
	public void filterNoITemsEquals()
	{
		db.add(2);
		db.add(2);
		db.add(3);

		List<Object> tempList = db.filter(object -> object.equals(2));
		int value = tempList.size();
		assertEquals(value, 2);
	}
	
	@Test
	public void getItemNoItems()
	{
		Optional<Object> result = 	db.get(value -> value.equals(new Object()));
		assertEquals(result, Optional.empty());		
	}
	
	@Test
	public void getItemEXists()
	{
		db.add(1);
		db.add(2);
		db.add(3);
		Optional<Object> result = 	db.get(value -> value.equals(2));
		assertTrue(result.isPresent());		
	}
	
	@Test
	public void getItemDosntExist()
	{
		db.add(1);
		db.add(2);
		db.add(3);
		Optional<Object> result = 	db.get(value -> value.equals(-1));
		assertFalse(result.isPresent());		
	}
	
	@Test
	public void removeItemNoItem()
	{
		boolean check = db.remove(new Object());
		assertFalse(check);		
	}
	

	
}
