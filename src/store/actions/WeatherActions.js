import { locationService } from "../../services/locationService";
import { weatherService } from "../../services/weatherService";
import { toast } from "react-toastify";

const notify = (msg) => toast(msg);

const _setCurrentLocation = (location) => ({ type: 'SET_LOCATION', location });
const _saveToFavorites = (location) => ({ type: 'ADD_NEW_LOCATION', location });
const _removeFromFavorites = (locationKey) => ({ type: 'REMOVE_LOCATION', locationKey });
const _toggleDarkMode = () => ({ type: 'TOGGLE_DARK_MODE' });
const _toggleUnit = (status) => ({ type: 'TOGGLE_UNIT',status });


export function setCurrentLocation(currentLocation) {
    return async (dispatch) => {
        if (currentLocation) {
            const currentLocationObj = {}
            const locationWeather = await weatherService.getFiveDaysForecast(currentLocation.Key)
            currentLocationObj.currWeather = locationWeather
            currentLocationObj.info = currentLocation
            locationService.setCurrentLocation(currentLocationObj)
            dispatch(_setCurrentLocation(currentLocationObj))
        }
    }
}



export function saveToFavorites(location) {
    try {
        locationService.save(location)
        notify('Added to Favorites Successful!')
        return (dispatch) => dispatch(_saveToFavorites(location))
    } catch (err) {
        notify('Error! We can not save to favorites')
    }
}

export function removeFromFavorites(location) {
    try {
        locationService.remove(location)
        notify('Removed from Favorites Successful!')
        return (dispatch) => dispatch(_removeFromFavorites(location.info.Key))
    } catch (err) {
        notify('Error! Failed to remove from favorites')
    }
}



export function toggleDarkMode() {
    return (dispatch) => dispatch(_toggleDarkMode())
}

export function toggleUnit(status) {
    return (dispatch) => dispatch(_toggleUnit(status))
}


