package dtu.ttnCommunication;

import java.net.URISyntaxException;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

import org.thethingsnetwork.data.common.Connection;
import org.thethingsnetwork.data.common.messages.ActivationMessage;
import org.thethingsnetwork.data.mqtt.Client;


public class MSGrecver
{
	String region = "";
	String appID = "";
	String appAccessKey = "";
	
	
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