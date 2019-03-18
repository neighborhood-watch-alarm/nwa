package dtu.smsComm;

public interface SMSSender
{
	public void addPhoneNumber(String number);
	public void sendToNumber(String number, String content);
	public void sendToAll(String content);

}
