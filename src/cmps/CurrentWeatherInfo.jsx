import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherService } from "../services/weatherService";
import { SearchBar } from "./SearchBar";
import { ReactComponent as Heart } from "../assets/images/heart.svg";
import { locationService } from "../services/locationService";
import {
  removeFromFavorites,
  saveToFavorites,
} from "../store/actions/WeatherActions";
import { ReactComponent as FilledHeart } from "../assets/images/filled_heart.svg";

export const CurrentWeatherInfo = ({ currentLocation }) => {
  const { isDarkMode ,isCelsius,favoriteLocations} = useSelector((state) => state.weatherModule);
  const [isLiking, setIsLiking] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(favoriteLocations);
    if (currentLocation) isLocationFavorite();
    // console.log(1);
  }, [currentLocation]);

  useEffect(() => {
    (async () => {
      if (currentLocation) {
        // const isLocationSaved = await locationService.getFavoriteById(currentLocation.info.Key);
        const isLocationSaved = findFavorits(currentLocation.info.Key);
        console.log(isLocationSaved);
        if (!isLocationSaved) {
          // console.log(currentLocation);
          if (isLiking) dispatch(saveToFavorites(currentLocation));
        } else {
          // console.log(currentLocation);
          if (!isLiking) dispatch(removeFromFavorites(currentLocation));
        }
      }
    })();
  }, [isLiking]);

  const isLocationFavorite = async () => {
    const isLocationSaved = findFavorits(currentLocation.info.Key);
    !isLocationSaved ? setIsLiking(false) : setIsLiking(true);
    // console.log(2);

  };

  const findFavorits = (key) =>{
    const isLocationSaved= favoriteLocations.find(favorite=>favorite.info.Key === key)
    console.log(favoriteLocations);
    console.log(isLocationSaved);
    return isLocationSaved
  }

  const toggleFavorite = (status) => {
    setIsLiking(status);
  };

  const { fahrenheitToCelsius} = weatherService

  return (
    <section className="current-location-container flex select">
      <div className="left-info-container flex">
        <div className="heart-container">
          {!isLiking && (
            <Heart onClick={() => toggleFavorite(true)} className="heart" />
          )}
          {isLiking && (
            <FilledHeart
              onClick={() => toggleFavorite(false)}
              className="heart"
            />
          )}
        </div>

        <div className={`current-info ${isDarkMode ? "dark" : ""}`}>
          <p>{currentLocation && currentLocation?.info?.LocalizedName}</p>
          <p>{currentLocation && currentLocation?.currWeather[0]?.Day?.IconPhrase}
          </p>
        </div>
      </div>

      <SearchBar />

      <div className="right-info-container flex">
        <img
          src={`https://www.accuweather.com/images/weathericons/03.svg`}
          alt=""
        />
        {currentLocation && isCelsius && <p>{fahrenheitToCelsius(currentLocation?.currWeather[0]?.Temperature?.Maximum?.Value)}</p>}
        {currentLocation && !isCelsius && <p>{currentLocation?.currWeather[0]?.Temperature?.Maximum?.Value}</p>}
         {currentLocation && isCelsius&& <span>°C</span> }
         {currentLocation && !isCelsius&&<span> °F</span>}

      </div>
    </section>
  );
};
