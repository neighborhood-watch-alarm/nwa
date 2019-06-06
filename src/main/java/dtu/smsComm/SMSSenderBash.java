package dtu.smsComm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

import dtu.database.Database;
import dtu.house.House;
import dtu.house.PhoneAddress;

public class SMSSenderBash implements SMSSender
{	
	Database<PhoneAddress> phoneNumbers;
	public SMSSenderBash(Database<PhoneAddress> phoneNumbers)
	{
		this.phoneNumbers = phoneNumbers;
	}
	
	/**
	 * Sends an SMS with the following content
	 */
	public void sendToNumber(String number, String content)
	{
		ProcessBuilder p = new ProcessBuilder("./send_sms", number, content);
		Process process = null;
		int errCode = 0;
		try {
			process = p.start();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			errCode = process.waitFor();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        System.out.println("SMS command executed, any errors? " + (errCode == 0 ? "No" : "Yes"));
        try {
			System.out.println("SMS Output:\n" + output(process.getInputStream()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}   
	}
	
    private static String output(InputStream inputStream) throws IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(inputStream));
            String line = null;
            while ((line = br.readLine()) != null) {
                sb.append(line + System.getProperty("line.separator"));
            }
        } finally {
            br.close();
        }
        return sb.toString();
    }
	

}
