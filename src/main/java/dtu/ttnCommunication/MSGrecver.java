package dtu.ttnCommunication;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Predicate;

import org.thethingsnetwork.data.common.Connection;
import org.thethingsnetwork.data.common.messages.ActivationMessage;
import org.thethingsnetwork.data.common.messages.DataMessage;
import org.thethingsnetwork.data.common.messages.DownlinkMessage;
import org.thethingsnetwork.data.mqtt.Client;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import au.com.forward.sipHash.SipHash_2_4;
import dtu.components.Component;
import dtu.database.Database;
import dtu.house.House;

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
	
	public BiConsumer<String,ActivationMessage> onActivationSetup()
	{
		return (String _devId, ActivationMessage _data) -> System.out.println("Activation: " + _devId + ", data: " + _data.getDevAddr());
	}
	
	public Consumer<Throwable> onErrorSetup()
	{
		return (Throwable _error) -> System.err.println("error: " + _error.getMessage());
	}
	
	public Consumer<Connection> onConnectionSetup()
	{
		return (Connection _client) -> System.out.println("connected to the backend!");
	}
	

	

}