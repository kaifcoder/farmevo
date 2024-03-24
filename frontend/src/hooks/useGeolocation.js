import { useEffect, useState } from 'react'

const useGeolocation = () => {

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" }
    });


    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setLocation((prevState) => ({
                ...prevState,
                loaded: true,
                error: {
                    code: 0,
                    message: "Geolocation is not available"
                }
            }));
        }
        navigator.geolocation.getCurrentPosition(
            (l) => {
                setLocation({
                    loaded: true,
                    coordinates: {
                        lat: l.coords.latitude,
                        lng: l.coords.longitude,
                    }
                });
            },
            (error) => {
                setLocation((prevState) => ({
                    ...prevState,
                    loaded: true,
                    error: {
                        code: error.code,
                        message: error.message
                    }
                }));
            }
        );

    }, []);

    return location;
}

export default useGeolocation