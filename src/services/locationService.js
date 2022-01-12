import { storageService } from "./storageService"
import { toast } from "react-toastify";

const notify = (msg) => toast(msg);

const LOCATIONS_KEY = 'favorites'
const CURRENT_LOCATION_KEY = 'currentLocation'


let defualtLocation = {
    "Version": 1,
    "Key": "215854",
    "Type": "Location",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
    }
}

let favorites = _loadLocations()

const getDefaultLocation = async () => {
    return { ...defualtLocation }
}

const getFavoriteById = (key) => {
    console.log(favorites);
    const location = favorites.find(location => location.info.Key === key);
    return Promise.resolve(location)
}

// const setCurrentLocation = (location) => {
//     storageService.saveToStorage(CURRENT_LOCATION_KEY, location)
//     defualtLocation = { ...location }
//     return Promise.resolve(location)
// }

const save = (locationToSave) => {
    favorites.push(locationToSave) 
    storageService.saveToStorage(LOCATIONS_KEY, favorites)
    return Promise.resolve(locationToSave);
}
function remove(locationToRemove) {
    if (favorites.length === 0) return
    const key = (locationToRemove.Key) ? locationToRemove.Key : locationToRemove.info.Key
    const idx = favorites.findIndex(location => location.info.Key === key)
    favorites.splice(idx, 1)
    storageService.saveToStorage(LOCATIONS_KEY, favorites)
    return Promise.resolve()
}

function _loadLocations() {
    let locations = storageService.loadFromStorage(LOCATIONS_KEY)
    if (!locations || !locations.length) locations = []
    storageService.saveToStorage(LOCATIONS_KEY, locations)
    return locations
}

export const locationService = {
    getDefaultLocation,
    // setCurrentLocation,
    _loadLocations,
    getFavoriteById,
    save,
    remove
}