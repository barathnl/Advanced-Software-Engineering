package com.restService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import javax.ws.rs.Produces;


import org.json.JSONException;


@Path("/serverMashup")
public class ServerMashup {
	
	@GET
	@Produces("application/json")
	public String mashup() throws JSONException{
		String RESTful_call1 = ServerCall1();
		String RESTful_call2 = ServerCall2();
		
		//Constructing Mashup JSON from two Web RESTful service call		
		String MashUp_Repsonse = "{ \"currentWeather\":"+RESTful_call1+",\"forecastWeather\":"+RESTful_call2+"}";
		return MashUp_Repsonse;
	}
	
	public String ServerCall1(){
		String rest1_output = null;
		try {
				// calling First RESTful web server to get CURRENT WEATHER Data
				// See ServerRest1.java for implementation
				URL url = new URL("http://localhost:8085/RESTservice/rest/server_1");
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Accept", "application/json");

				if (conn.getResponseCode() != 200) {
					throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
				}

				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
				rest1_output = br.readLine();
				System.out.println(rest1_output);
								
				conn.disconnect();
								
			  } catch (MalformedURLException e) {
				e.printStackTrace();
			  } catch (IOException e) {
				e.printStackTrace();
			  }
		  return rest1_output;
	}
	
	public String ServerCall2(){
		String rest2_output = null;
		try {
				// calling Second RESTful web server to get FORECAST WEATHER Data for one day
				// See ServerRest2.java for implementation
				URL url = new URL("http://localhost:8085/RESTservice/rest/server_2");
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Accept", "application/json");

				if (conn.getResponseCode() != 200) {
					throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
				}

				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
				rest2_output = br.readLine();
				System.out.println(rest2_output);
								
				conn.disconnect();
								
			  } catch (MalformedURLException e) {
				e.printStackTrace();
			  } catch (IOException e) {
				e.printStackTrace();
			  }
		  return rest2_output;
	}
}

