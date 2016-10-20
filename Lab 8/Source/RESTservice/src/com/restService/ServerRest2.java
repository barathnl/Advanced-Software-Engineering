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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/server_2")
public class ServerRest2 {
	
	@GET
    //@Produces("application/json")
	
	//REST API 2 call
			public String serverRestCall2() throws JSONException{
				String rest2_Fulloutput = null;
				String forecast_weather = null;
				try {

						URL url = new URL("http://api.openweathermap.org/data/2.5/forecast?q=KansasCity,usa&appid=b7ab086f927e0422985a206f54f9b5bb&units=metric&cnt=7");
						HttpURLConnection conn = (HttpURLConnection) url.openConnection();
						conn.setRequestMethod("GET");
						conn.setRequestProperty("Accept", "application/json");

						if (conn.getResponseCode() != 200) {
							throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
						}

						BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
						rest2_Fulloutput = br.readLine();
						//System.out.println(rest2_Fulloutput);
						
						//Extracting only forecast weather data from whole JSON response 
						JSONObject obj = new JSONObject(rest2_Fulloutput);
						JSONArray forecast_array = obj.getJSONArray("list");
						forecast_weather=forecast_array.toString();
						//System.out.println(forecast_weather);
										
						conn.disconnect();
										
					  } catch (MalformedURLException e) {
						e.printStackTrace();
					  } catch (IOException e) {
						e.printStackTrace();
					  }
				  return forecast_weather;
			}

}
