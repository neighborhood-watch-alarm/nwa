package dtu.smsComm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;


public class SMSSenderBash implements SMSSender
{	
	
	/**
	 * Sends an SMS with the following content
	 */
	public void sendToNumber(String number, String content)
	{
		//Process builders can run bash
		ProcessBuilder p = new ProcessBuilder("./send_sms.sh", number, content);
		Process process = null;
		int errCode = 0;
		try {
			process = p.start();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		try {
			errCode = process.waitFor();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        System.out.println("SMS command executed, any errors? " + (errCode == 0 ? "No" : "Yes"));
        try {
			System.out.println("SMS Output:\n" + output(process.getInputStream()));
		} catch (IOException e) {
			e.printStackTrace();
		}   
	}
	
	/**
	 * Takes the stream and prints it out used in case of error on bash process stream.
	 * @param inputStream
	 * @return
	 * @throws IOException
	 */
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
