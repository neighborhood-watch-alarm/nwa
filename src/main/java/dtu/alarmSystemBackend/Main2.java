package dtu.alarmSystemBackend;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.Writer;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.Optional;
import java.util.function.Predicate;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.thethingsnetwork.data.common.Connection;
import org.thethingsnetwork.data.mqtt.Client;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import org.thethingsnetwork.data.common.messages.ActivationMessage;
import org.thethingsnetwork.data.common.messages.DataMessage;
import org.thethingsnetwork.data.common.messages.DownlinkMessage;
import org.thethingsnetwork.data.common.messages.RawMessage;
import org.thethingsnetwork.data.common.messages.UplinkMessage;

import dtu.database.Component;
import dtu.database.Database;
import dtu.database.DatabaseArrayList;
import dtu.database.DeviceEnum;
import dtu.database.House;
import dtu.database.HouseImplementation;
import dtu.database.PhoneAddress;
import dtu.ttnCommunication.MSGrecver;

/**
 * Hello world!
 *
 */
public class Main2 
{
	private Database<House> houseDB;
	private Database<Component> deviceDB;
	private Database<PhoneAddress> phoneAddrDB;
	
	private Gson gson;
	
	Client client;
	
	public static void main(String[] args) throws MqttException, Exception
	{
		new Main2();

	}
		
    public Main2() throws Exception
    {
    	Client client = new MSGrecver().setupRecver();
    	client.onConnected((Connection _client) -> System.out.println("connected !"));
        
    	try {
			client.start();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	

    	

    	while(true)
    	{
    		try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			//byte[] msg = {0x00};
			//
    		System.out.print(".");
    	}

    	
         
    }
}
