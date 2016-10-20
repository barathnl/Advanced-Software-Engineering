package com.restService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.json.JSONException;
import org.json.JSONObject;

@Path("/server_1")
public class ServerRest1 {
	
	    @GET
	    //@Produces("application/json")
	    
	    //REST API 1 call
		public String serverRestCall1() throws JSONException{
			String rest1_Fulloutput = null;
			String current_weather = null;
			try {

					URL url = new URL("http://api.openweathermap.org/data/2.5/weather?q=KansasCity,usa&appid=b7ab086f927e0422985a206f54f9b5bb&units=metric");
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setRequestMethod("GET");
					conn.setRequestProperty("Accept", "application/json");

					if (conn.getResponseCode() != 200) {
						throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
					}

					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
					rest1_Fulloutput = br.readLine();
					//System.out.println(rest1_Fulloutput);
					
					//Extracting only current weather data from whole JSON response
					JSONObject obj = new JSONObject(rest1_Fulloutput);
					current_weather=obj.getString("main");
					//System.out.println(current_weather);
									
					conn.disconnect();
									
				  } catch (MalformedURLException e) {
					e.printStackTrace();
				  } catch (IOException e) {
					e.printStackTrace();
				  }
			  return current_weather;
		}
}
