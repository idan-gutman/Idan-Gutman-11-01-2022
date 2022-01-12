import { locationService } from "../../services/locationService";

const initialState = {
    currentLocation: null,
    favoriteLocations: locationService._loadLocations(),
    isDarkMode: false,
    isCelsius: true,
}


export default function WeatherReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_LOCATION':
            return {
                ...state,
                currentLocation: action.location
            }
        case 'ADD_NEW_LOCATION':
            return {
                ...state,
                favoriteLocations: [...state.favoriteLocations, action.location]
            }
        case 'REMOVE_LOCATION':
            return {
                ...state,
                favoriteLocations: state.favoriteLocations.filter(location => location.info.Key !== action.locationKey)
            }
        case 'TOGGLE_DARK_MODE':
            return {
                ...state,
                isDarkMode: !state.isDarkMode
            }
        case 'TOGGLE_UNIT':
            return {
                ...state,
                isCelsius: action.status
            }
        default:
            return state;
    }
}