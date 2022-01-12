import React from "react";
import { Box, Card } from "@material-ui/core";
import { useSelector } from "react-redux";
import { weatherService } from "../services/weatherService";
import moment from "moment";

export const WeatherPreview = ({ dailyForecast }) => {
  const { isCelsius, isDarMode } = useSelector((state) => state.weatherModule);

  const { fahrenheitToCelsius, setIcon } = weatherService;
  const { Minimum, Maximum } = dailyForecast.Temperature;

  return (
    <Box className="weather-preview" key={dailyForecast.EpochDate}>
      <Card
        className="weather-card"
        variant="elevation"
        color="black"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="card-container flex column align-center">
          <p className={"title"}>
            {moment(dailyForecast?.Date).format("dddd")}
          </p>
          {
            <img
              src={`https://www.accuweather.com/images/weathericons/${setIcon(
                dailyForecast.Day.Icon
              )}.svg`}
              alt=""
            />
          }
          <div className="tempature-container flex">
            <div className="tempature max">
              {!isCelsius && <p>Max:{Maximum.Value} </p>}
              {isCelsius && <p>Max:{fahrenheitToCelsius(Maximum.Value)} </p>}
              {isCelsius && <span>°C</span>}
              {!isCelsius && <span> °F</span>}
            </div>
            <div className="tempature min">
              {!isCelsius && <p>Min:{Minimum.Value} </p>}
              {isCelsius && <p>Min:{fahrenheitToCelsius(Minimum.Value)} </p>}
              {isCelsius && <span>°C</span>}
              {!isCelsius && <span> °F</span>}
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};
