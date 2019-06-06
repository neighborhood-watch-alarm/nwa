package dtu.database;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;


public interface Database<T>
{
	public void add(T e);
	public boolean remove(T e);
	public Optional<T> get(Predicate<T> t);
	public int size();
	public List<T> filter(Predicate<T> expression); 
}
