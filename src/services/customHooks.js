import {useEffect, useState } from "react"

export const useGeoLocation = () => {
    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {
        getUserLocation()
    }, [])

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            geoLocationSuccess,
            geoLocationError
        );
    };

    const geoLocationSuccess = (position) => {
        setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude })
    };
    
    const geoLocationError = (err) => {
        setUserLocation(false)
    };

    return userLocation
}