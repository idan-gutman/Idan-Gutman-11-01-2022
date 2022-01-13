import React from "react";
import { Box, Card } from "@material-ui/core";
import { weatherService } from "../services/weatherService";
import moment from "moment";
import { TempPreview } from "./TempPreview";

export const WeatherPreview = ({ dailyForecast }) => {

  const {setIcon } = weatherService;

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
          <p className={"title"}>{moment(dailyForecast?.Date).format("dddd")}</p>
            <img src={`https://www.accuweather.com/images/weathericons/${setIcon(dailyForecast.Day.Icon)}.svg`}alt=""/>
            <TempPreview dailyForecast={dailyForecast}/>
        </div>
      </Card>
    </Box>
  );
};
