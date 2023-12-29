import { Weather } from "@/types";
import React from "react";
import Image from "next/image";
import {
  Sunrise,
  Sunset,
  Thermometer,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { format } from "date-fns";

interface WeatherProps {
  data: Weather | undefined;
}

// Display weather information selected city -> temprature, feels, wind, sunrise and sunset
const Weather = ({ data }: WeatherProps) => {
  return (
    <div className="flex w-full flex-row-reverse items-center justify-between">
      {data?.weather.map((item) => (
        <React.Fragment key={item.id}>
          <Image
            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
            alt="logo"
            width={100}
            height={100}
          />
        </React.Fragment>
      ))}
      <div className="mt-8 flex flex-col items-start justify-center gap-2">
        <div className="flex items-center gap-2">
          <Thermometer />
          <p>Sıcaklık: {data?.main.temp.toFixed()} °C</p>
        </div>
        <div className="flex items-center gap-2">
          <ThermometerSun />
          <p>Hissedilen {data?.main.feels_like.toFixed()} °C</p>
        </div>
        <div className="flex items-center gap-2">
          <Wind /> Rüzgar
          <p>{data?.wind.speed.toFixed()} km/h</p>
        </div>
        <div className="flex items-center gap-2">
          <Sunrise />
          <p>
            Gün doğumu:{" "}
            {data && format(new Date(data?.sys.sunrise * 1000), "HH:mm")} am
          </p>
        </div>
        <div className=" flex items-center gap-2">
          <Sunset />
          <p>
            Gün batımı:{" "}
            {data && format(new Date(data?.sys.sunset * 1000), "HH:mm")} pm
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
