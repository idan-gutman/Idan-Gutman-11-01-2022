import React from "react";
import { WeatherPreview } from "./WeatherPreview";

export const WeatherList = ({currentLocation}) => {

  return (
    <section className="weather-list">
      {currentLocation?.fiveDaysForecast?.map((dailyForecast,idx) => {
        return (
          <WeatherPreview dailyForecast={dailyForecast} key={idx} />
        );
      })}
    </section>
  );
};
