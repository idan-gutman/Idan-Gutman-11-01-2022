import React from "react";
import { useSelector } from "react-redux";
import { weatherService } from "../services/weatherService";

export const TempPreview = ({ dailyForecast}) => {
    const { isCelsius} = useSelector((state) => state.weatherModule);

  const { fahrenheitToCelsius } = weatherService;
  const { Minimum, Maximum } = dailyForecast.Temperature;

  return (
    <div className="temp-container flex">
      <div className="temp max">
        {!isCelsius && <p>Max:{Maximum.Value} </p>}
        {isCelsius && <p>Max:{fahrenheitToCelsius(Maximum.Value)} </p>}
        {isCelsius && <span>°C</span>}
        {!isCelsius && <span> °F</span>}
      </div>
      <div className="temp min">
        {!isCelsius && <p>Min:{Minimum.Value} </p>}
        {isCelsius && <p>Min:{fahrenheitToCelsius(Minimum.Value)} </p>}
        {isCelsius && <span>°C</span>}
        {!isCelsius && <span> °F</span>}
      </div>
    </div>
  );
};
