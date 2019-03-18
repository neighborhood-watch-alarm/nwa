package dtu.database;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;


public class DatabaseArrayList<T> implements Database<T>
{
	private List<T> db;
	
	public DatabaseArrayList()
	{
		db = new ArrayList<T>();
	}
	
	
	public void add(T o)
	{
		db.add(o);
	}

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

	public boolean remove(Object o) {
		return db.remove(o);
	}

}
