import axios from "axios";
import { toast } from 'react-toastify';

const API_WEATHER_URL = 'https://dataservice.accuweather.com';

const API_KEY = 'GeVYmUfhRZZDowVfDvP6HCOWR8QcbS0E';

const notifyEror = (msg) => toast.error(msg);
const notifyWarning = (msg) => toast.warn(msg);


async function getFiveDaysForecast(key) {
    try {
        const response = await axios.get(`${API_WEATHER_URL}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`)
        return response.data.DailyForecasts
    } catch (err) {
        console.error('weatheService: error while try to fetch current weather');
    }
}

async function getWeather(locationCode) {
    try {
        const response = await axios.get(`${API_WEATHER_URL}/currentconditions/v1/${locationCode}?apikey=${API_KEY}&details=true&metric=true`);
        return response.data;
    } catch (error) {
        console.error('weather service: error while try to fetch current weather');
    }
}


async function getAutocomplete(q) {
    try {
        _checkIfEnglish(q)
        const resp = await axios.get(`${API_WEATHER_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}`)
        return resp.data
    }
    catch (err) {
        notifyEror('Error while try to fetch autocomplete search')
        console.error('weatheService: error while try to fetch autocomplete search');
    }
}

async function getGeoLocation(lat, lon) {
    try {
        const res = await axios.get(`${API_WEATHER_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`);
        return res.data;
    } catch (error) {
        notifyEror('error while try to get your location')
        console.error('weatherService: error while try to fetch geolocation');
    }
}


const _checkIfEnglish = (search) =>{
    if (search === '') return []
    const english = /^[A-Za-z ]*$/;
    if (!(english.test(search))) {
        notifyWarning('Please search in English only')
        return []
    }
}

const fahrenheitToCelsius = (temp) => {
    return ((temp - 32) * 5 / 9).toFixed(0);
}

const setIcon = (icon) => {
    return (icon < 10) ? `0${icon}` : icon
}


export const weatherService = {
    getFiveDaysForecast,
    fahrenheitToCelsius,
    getAutocomplete,
    getGeoLocation,
    setIcon,
    getWeather
    
}