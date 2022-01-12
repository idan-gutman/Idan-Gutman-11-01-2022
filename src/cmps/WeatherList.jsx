import React from "react";
import { WeatherPreview } from "./WeatherPreview";

export const WeatherList = ({currentLocation}) => {

  return (
    <section className="weather-list">
      {currentLocation?.currWeather?.map((dailyForecast) => {
        return (
          <WeatherPreview dailyForecast={dailyForecast} key={Math.random()} />
        );
      })}
    </section>
  );
};
