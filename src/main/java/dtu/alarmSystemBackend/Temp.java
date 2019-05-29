package dtu.alarmSystemBackend;

import java.util.UUID;

import dtu.database.AddressValue;

public class Temp {

	public static void main(String[] args) {
		//Create new houses and utilize UUID.randomUUID().toString()) to generate houseIDs
		System.out.println(new AddressValue("Temp Addr").hashCode());
	}

}
