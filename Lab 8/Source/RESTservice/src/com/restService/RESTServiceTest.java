package com.restService;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class RESTServiceTest {

	ServerMashup test_obj=new ServerMashup();
	String test1=test_obj.ServerCall1();
	String test2="{\"temp\":18.21,\"temp_min\":18.21,\"grnd_level\":999.3,\"humidity\":50,\"pressure\":999.3,\"sea_level\":1033.62,\"temp_max\":18.21}";
	
	@Test
	public void testJSON_1(){
		System.out.println("Success");
		assertEquals(test1, test2);
	}
	
	String test3=test_obj.ServerCall2().substring(50, 57);
	String test4="weather";
	
	@Test
	public void testJSON_2(){
		System.out.println("Success");
		System.out.println(test3);
		assertEquals(test3, test4);
	}
	
}
