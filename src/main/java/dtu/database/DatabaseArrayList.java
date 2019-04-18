package dtu.database;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;


public class DatabaseArrayList<T> implements Database<T>, Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<T> db;
	
	public int size()
	{
		return db.size();
	}
	
	public DatabaseArrayList()
	{
		db = new ArrayList<T>();
	}
	
	
	public void add(T o)
	{
		db.add(o);
	}
	
	public void apply(Consumer<? super T> action)
	{
		db.forEach(action);
	}
	
	public List<T> filter(Predicate<T> expression)
	{
		return db.stream().filter(expression).collect(Collectors.toList());
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
