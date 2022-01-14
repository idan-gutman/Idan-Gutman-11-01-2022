import { locationService } from "../../services/locationService";
import { weatherService } from "../../services/weatherService";
import { toast } from "react-toastify";

const notify = (msg) => toast(msg);
const notifyEror = (msg) => toast.error(msg);

const _setCurrentLocation = (location) => ({ type: 'SET_LOCATION', location });
const _saveToFavorites = (location) => ({ type: 'ADD_NEW_LOCATION', location });
const _removeFromFavorites = (locationKey) => ({ type: 'REMOVE_LOCATION', locationKey });
const _toggleDarkMode = () => ({ type: 'TOGGLE_DARK_MODE' });
const _toggleUnit = (status) => ({ type: 'TOGGLE_UNIT',status });


export function setCurrentLocation(currentLocation) {
    return async (dispatch) => {
        if (currentLocation) {
            const fullWeatherInfo = {}
            const fiveDaysForecast = await weatherService.getFiveDaysForecast(currentLocation.Key)
            const cuerrWeather = await weatherService.getWeather(currentLocation.Key)
            fullWeatherInfo.fiveDaysForecast = fiveDaysForecast
            fullWeatherInfo.info = currentLocation
            fullWeatherInfo.cuerrWeather = cuerrWeather
            locationService.setCurrentLocation(fullWeatherInfo)
            dispatch(_setCurrentLocation(fullWeatherInfo))
        }
    }
}


export function saveToFavorites(location) {
    try {
        locationService.save(location)
        notify('Added to Favorites Successful!')
        return (dispatch) => dispatch(_saveToFavorites(location))
    } catch (err) {
        notifyEror('There is an error trying to save to favorites')
    }
}

export function removeFromFavorites(location) {
    try {
        locationService.remove(location)
        notify('Removed from Favorites Successful!')
        return (dispatch) => dispatch(_removeFromFavorites(location.info.Key))
    } catch (err) {
        notifyEror('Error! Failed to remove from favorites')
    }
}



export function toggleDarkMode() {
    return (dispatch) => dispatch(_toggleDarkMode())
}

export function toggleUnit(status) {
    return (dispatch) => dispatch(_toggleUnit(status))
}


