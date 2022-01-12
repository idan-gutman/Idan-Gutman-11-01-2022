import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CurrentWeatherInfo } from '../cmps/CurrentWeatherInfo'
import { WeatherList } from '../cmps/WeatherList'
import { locationService } from '../services/locationService'
import { setCurrentLocation } from '../store/actions/WeatherActions'

export const WeatherDetails = () => {
    const dispatch = useDispatch()

    const { currentLocation,isDarkMode} = useSelector(state => state.weatherModule)

      useEffect(() => {
        (async () => {
            if(!currentLocation){
                const defaultLocation = await locationService.getDefaultLocation();
                dispatch(setCurrentLocation(defaultLocation));
            }
        })();
      }, []);

    return (
        <section className={`main-container ${isDarkMode? 'dark':''} ` }>
            <div className="WeatherDetails-container flex column">
                <CurrentWeatherInfo currentLocation={currentLocation} />
                <WeatherList currentLocation={currentLocation} />
            </div>
        </section>
    )
}