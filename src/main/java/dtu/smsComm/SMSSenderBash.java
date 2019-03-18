package dtu.smsComm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class SMSSenderBash implements SMSSender
{
    private Set<String> phoneNumbers = new HashSet<String>();
	
    /**
     * Adds a phonenumber to the set, in case a number is non-unique it wont get added.
     * Please note that a number like +45123.. is not considered equivalent to 123..
     * @author s164166
     */
	public void addPhoneNumber(String number)
	{
		phoneNumbers.add(number);
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
	
	public void sendToAll(String content)
	{
		for (String number : phoneNumbers)
		{
			sendToNumber(number, content);
		}
	}

}
