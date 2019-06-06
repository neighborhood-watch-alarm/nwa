package dtu.ttnCommunication;

import java.net.URISyntaxException;

import org.thethingsnetwork.data.mqtt.Client;

public class MSGrecver
{
	private Client client;
	String region = "eu";
	String appID = "dtu_nwa";
	String appAccessKey = "ttn-account-v2.3Npyl34nrqhAQ8YT_A0eJapgYVMCzeOoR82H1XsnZDU";
	
	
	public Client setupRecver() throws URISyntaxException
	{
		Client client = new Client(region, appID, appAccessKey );
		return client;	
	}
}