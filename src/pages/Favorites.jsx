import React from "react";
import { useSelector } from "react-redux";
import { FavoriteList } from "../cmps/Favorites/FavoriteList";

import { ReactComponent as Weather } from '../assets/images/undraw_season_change.svg';

export const Favorites = () => {
  const { favoriteLocations,isDarkMode } = useSelector((state) => state.weatherModule);

  return (
    <section className={`main-container ${isDarkMode ? 'dark': ''}`}>
      <div className="favorite-container">
        {!favoriteLocations.length && (
          <div className="empty-favorites flex">
            <h2>No Favorites yet</h2>
            <Weather className="svg" />
          </div>
        )}
        <FavoriteList favorites={favoriteLocations} />
      </div>
    </section>
  );
};
