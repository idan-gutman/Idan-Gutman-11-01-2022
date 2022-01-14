import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CurrentWeatherInfo } from '../cmps/CurrentWeatherInfo'
import { WeatherList } from '../cmps/WeatherList'
import { useGeoLocation } from '../services/customHooks'
import { locationService } from '../services/locationService'
import { weatherService } from '../services/weatherService'
import { setCurrentLocation } from '../store/actions/WeatherActions'

export const WeatherDetails = () => {
    const dispatch = useDispatch()

    const { currentLocation,isDarkMode} = useSelector(state => state.weatherModule)

    const currGeoLocation = useGeoLocation()

    useEffect(() => {
        (async () => {
            if(currGeoLocation){
                const geoLocation = await weatherService.getGeoLocation(currGeoLocation.lat, currGeoLocation.lon);
                console.log(geoLocation);
                dispatch(setCurrentLocation(geoLocation));
            }
            else if(!currentLocation){
                const defaultLocation = await locationService.getDefaultLocation();
                dispatch(setCurrentLocation(defaultLocation));
            }  
        })();
      }, [currGeoLocation]);
      
    return (
        <section className={`main-container ${isDarkMode? 'dark':''} ` }>
            <div className="WeatherDetails-container flex column">
                <CurrentWeatherInfo currentLocation={currentLocation} />
                <WeatherList currentLocation={currentLocation} />
            </div>
        </section>
    )
}