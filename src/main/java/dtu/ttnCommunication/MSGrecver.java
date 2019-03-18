package dtu.ttnCommunication;

import java.net.URISyntaxException;

import org.thethingsnetwork.data.mqtt.Client;

public class MSGrecver
{
	private Client client;
	String region = "eu";
	String appID = "dtu_hello_world_test_1_2019";
	String appAccessKey = "ttn-account-v2.p4eyF3rq9bgl7C60sqrRshXSWgykN8zCicWQk64AdPY";
	
	
	public Client setupRecver() throws URISyntaxException
	{
		Client client = new Client(region, appID, appAccessKey );
		return client;
		
	}

}
