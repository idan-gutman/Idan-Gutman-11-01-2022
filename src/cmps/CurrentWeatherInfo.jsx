import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "./SearchBar";
import { ReactComponent as Heart } from "../assets/images/heart.svg";
import {
  removeFromFavorites,
  saveToFavorites,
} from "../store/actions/WeatherActions";
import { ReactComponent as FilledHeart } from "../assets/images/filled_heart.svg";

export const CurrentWeatherInfo = ({ currentLocation }) => {
  const { isDarkMode, isCelsius, favoriteLocations } = useSelector((state) => state.weatherModule);
  const [isLiking, setIsLiking] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLocation) onSetIsLiking();
  }, [currentLocation]);

  useEffect(() => {
    onSaveToFavorites()
  }, [isLiking]);

  const onSaveToFavorites = async () => {
    if (!currentLocation) return
    if (isLiking === null) return
    const isLocationSaved = findFavorits(currentLocation.info.Key);
    if (!isLocationSaved) {
      if (isLiking) dispatch(saveToFavorites(currentLocation));
    }
    else {
      if (!isLiking) dispatch(removeFromFavorites(currentLocation));
    }
  }

  const onSetIsLiking = async () => {
    const isLocationSaved = findFavorits(currentLocation.info.Key);
    !isLocationSaved ? setIsLiking(false) : setIsLiking(true);
  };

  const findFavorits = (key) => {
    const isLocationSaved = favoriteLocations.find(favorite => favorite.info.Key === key)
    return isLocationSaved
  }

  const toggleFavorite = (status) => {
    setIsLiking(status);
  };

  return (
    <section className="current-location-container flex select">
      <div className="left-info-container flex">
        <div className="heart-container">
          {!isLiking && (
            <Heart onClick={() => toggleFavorite(true)} className="heart pointer" />
            )}
          {isLiking && (
            <FilledHeart
            onClick={() => toggleFavorite(false)}
            className="heart pointer"
            />
            )}
        </div>

        <div className={`current-info ${isDarkMode ? "dark" : ""}`}>
          <p>{currentLocation && currentLocation?.info?.LocalizedName}</p>
          <p>{currentLocation && currentLocation?.cuerrWeather[0]?.WeatherText}</p>
        </div>
      </div>

            <SearchBar />

      <div className="right-info-container flex">
        <img
          src={`https://www.accuweather.com/images/weathericons/03.svg`}
          alt=""
        />
        {currentLocation && isCelsius && <p>{currentLocation?.cuerrWeather[0]?.Temperature?.Metric?.Value}</p>}
        {currentLocation && !isCelsius && <p>{currentLocation?.cuerrWeather[0]?.Temperature?.Imperial?.Value}</p>}
        {currentLocation && isCelsius && <span>°C</span>}
        {currentLocation && !isCelsius && <span> °F</span>}

      </div>
    </section>
  );
};
