import axios, { isAxiosError } from "axios";
import { GeoLocation, Weather } from "@/types";

// need this url to get city geolocation. Get lat and lot in order to send request to get weather data
const locationBaseURl = "https://api.openweathermap.org/geo/1.0/direct";
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";

export const getCoordinates = async (city: string, appid: string) => {
  try {
    const params = {
      q: city,
      appid: appid,
    };
    const { data } = await axios.get<GeoLocation[]>(locationBaseURl, {
      params,
    });
    const lat = data[0].lat;
    const lon = data[0].lon;
    const name = data[0].name;
    return {
      lat,
      lon,
      name,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};

/* Get weather data -> need to access lat and lon to send request to city weather
  Temprature is hard coded to metric system. Maybe user can select the metric system change celcius to fahrenheit for ex.
*/
export const getWeather = async (lat: number, lon: number, appid: string) => {
  const params = {
    lat,
    lon,
    appid,
    units: "metric",
  };
  try {
    const { data } = await axios.get<Weather>(weatherBaseUrl, { params });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};
