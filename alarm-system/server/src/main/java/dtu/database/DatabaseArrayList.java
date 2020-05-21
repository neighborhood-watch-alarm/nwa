package dtu.database;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;


/**
 * The database implementation based on the arrayList structure,
 * @param <T>
 */
public class DatabaseArrayList<T> implements Database<T>, Serializable
{

	private static final long serialVersionUID = 1L;
	private List<T> db;
	
	/**
	 * Returns the size of the object
	 */
	public int size()
	{
		return db.size();
	}
	
	/**
	 * Creates a new DatabaseArrayList
	 */
	public DatabaseArrayList()
	{
		db = new ArrayList<T>();
	}
	
	/**
	 * Add the item to the database
	 */
	public void add(T o)
	{
		db.add(o);
	}
	
	/**
	 * Returns each item that matches the given predicate as a list.
	 */
	public List<T> filter(Predicate<T> expression)
	{
		return db.stream().filter(expression).collect(Collectors.toList());
	}
	

	/**
	 * Returns an optional based on whether or whether not an object that matches the expression exists.
	 */
	public Optional<T> get(Predicate<T> expression)
	{
		if (db.size() == 0)
			return Optional.empty();

		for (T	object : db)
		{
			if (expression.test(object))
			{
				return Optional.of(object);
			}
		}
		return Optional.empty();
	}

	/**
	 * Remove the given object from the database.
	 */
	public boolean remove(Object o) {
		return db.remove(o);
	}

}
