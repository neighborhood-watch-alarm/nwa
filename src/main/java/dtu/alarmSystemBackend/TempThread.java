package dtu.alarmSystemBackend;

import java.time.Duration;
import java.time.LocalDateTime;

public class TempThread {

	public static void main(String[] args) throws InterruptedException
	{
	    LocalDateTime now = LocalDateTime.now();
	    Thread.sleep(3190);
		LocalDateTime nower = LocalDateTime.now();
		

		long time = Duration.between(now, nower).toMillis();
		System.out.println("Time between timestamps: " + time);
	}
}
