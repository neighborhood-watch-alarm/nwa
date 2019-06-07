package dtu.exampleFile;

import java.io.IOException;

import au.com.forward.sipHash.SipHash_2_4;

public class HashExample {
	private static SipHash_2_4 hash = new SipHash_2_4();
	
	public static void main(String[] args)
	{
		byte[] salt = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x00, 0x00};		
		hash.initialize(salt);
		char[] pw = {'1','2','3','4'};
		for (int i = 0; i < 4; i++)
		{
			hash.updateHash((byte) pw[i]);
		}
		long result = hash.finish();
		byte[] set1 = SipHash_2_4.longToBytesLE(result);
		byte[] set2 = SipHash_2_4.longToBytes(result);
		for (int i = 0; i < set1.length; i++)
		{
			int int1 = set1[i];
			int int2 = set2[i];
			if (int1 < 0)
			{
				int1 = int1+256;
			}
			if (int2 < 0)
			{
				int2 = int2+256;
			}
			System.out.println(int2);
		}

		
	}

}
