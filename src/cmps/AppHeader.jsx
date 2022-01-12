import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Sun } from "../assets/images/sun.svg";
import { ReactComponent as Moon } from "../assets/images/moon.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleUnit } from "../store/actions/WeatherActions";

export function AppHeader() {
  const dispatch = useDispatch();
  const { isDarkMode,isCelsius } = useSelector((state) => state.weatherModule);

  const toggleMode = () => {
    dispatch(toggleDarkMode());
  };

  const onSetToggleUnit=(status)=>{
      dispatch(toggleUnit(status))
  }

  return (
    <header className="app-header">
      <nav className="main-nav">
        {
          <div className="left-nav">
            <NavLink activeClassName="underline" to="/" exact={true}>
              <span>Home</span>
            </NavLink>
            <NavLink activeClassName="underline" to="/favorites">
              <span>Favorites</span>
            </NavLink>
          </div>
        }
        <div className="right-nav flex">
          
          {isDarkMode && <Sun onClick={toggleMode} className="toggle-mode" />}
          {!isDarkMode && <Moon onClick={toggleMode} className="toggle-mode" />}
          <div className="unit-selector select">
            <span onClick={()=>onSetToggleUnit(true)} className={isCelsius ? 'bold' : 'pointer'}>°C</span> 
            <span onClick={()=>onSetToggleUnit(false)} className={!isCelsius ? 'bold' : 'pointer'}>°F</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
