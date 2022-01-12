import axios from "axios";
import { toast } from 'react-toastify';


const API_WEATHER_URL = 'https://dataservice.accuweather.com';

const API_KEY = 'tBiJIiEX3QUH4wlV1eGDeGPi6evLzjSs'
// const API_KEY = '6TvuqkQbGVyr8Jxem9hLBmHQkVhCj23y'
// const API_KEY = 'jFNMdQo1pBiVUtWdeO2EFPfHAX7wAJNX'
// const API_KEY = 'dKKw50ewg2TV00RDzBmObRNk3e1wybJo'
// const API_KEY = 'urHZKnS2OnuuNhW6lTFXGp7Bplz5ad6w'
//const API_KEY = 'dlds2InmiZd04CAuI2U7EMPVMK6qjpP1';

const notify = (msg) => toast(msg);

async function getFiveDaysForecast(key) {
    try {
        const response = await axios.get(`${API_WEATHER_URL}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`)
        return response.data.DailyForecasts
    } catch (err) {
        console.error('weatheService: error while try to fetch current weather');
    }
}


async function getAutocomplete(q) {
    try {
        _checkIfEnglish(q)
        const resp = await axios.get(`${API_WEATHER_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}`)
        return resp.data
    }
    catch (err) {
        console.error('weatheService: error while try to fetch autocomplete search');
    }
}

const _checkIfEnglish = (search) =>{
    if (search === '') return []
    const english = /^[A-Za-z ]*$/;
    if (!(english.test(search))) {
        notify('Please search in English only')
        return []
    }
}

const fahrenheitToCelsius = (tempature) => {
    return ((tempature - 32) * 5 / 9).toFixed(0);
}

const setIcon = (icon) => {
    return (icon < 10) ? `0${icon}` : icon
}


export const weatherService = {
    getFiveDaysForecast,
    fahrenheitToCelsius,
    getAutocomplete,
    setIcon
    
}