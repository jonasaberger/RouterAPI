import { useState } from "react";
import getLocation from "../services/getLocation";
import getWeather from "../services/getWeather";
import getWeatherIcon from "../services/getWeatherIcon";
import Button from 'react-bootstrap/Button'


const Weather = (props) => {
    const [position,setPosition] = useState(["-","-"])
    const [weatherData,setWeatherData] = useState(null)
    const [weatherImage,setWeatherImage] = useState(null)
    const [updateContainer,setUpdateContainer] = useState(false)

    const api_key = "ff405c12ed1acb3a636d642065628df0";


    const handleClick = () => {
        getLocation()
            .then(coords => {
                setPosition(coords);
                getWeather(position[0],position[1], api_key)
                .then(data => {
                    if(data) {
                        // Success

                        // Update the Style
                        setUpdateContainer(true)
                        

                        // Setting the Weather Data
                        setWeatherData(data)
                        
                        getWeatherIcon(data.weather[0].icon)
                        .then (weatherIcon => {
                            setWeatherImage(weatherIcon.url)
                        })

                        

                        console.log(data)
                    }
                    else {
                        console.log("ERROR getting Weather")
                    }
                })
                .catch(error =>
                    console.log("ERROR fetching Weather")
                )
            })
            .catch(error => {
                console.error("ERROR getting location:", error);
                setPosition(["-", "-"]); // Set position to default values or handle error state
            });
    }


    return (
        <div className={`WeatherContainer-${updateContainer ? 'Display' : 'Message'}`}>
            <h2 className="WeatherTitle">Weather-Display</h2>

            {weatherData && (
                <>
                    <img src={weatherImage} alt="Weather" />
                
                    <b>{((weatherData.main.temp)-273.15).toFixed(2)}°</b> <br />
                    <b>{weatherData.name}</b> <br />
                </>
            )}
            {!weatherData && (
                <>
                    <b>Weather couldn't be loaded...</b><br />
                    <b>Check your browsers privacy settings</b><br />
                </>
            )}
            
            <Button className="WeatherButton" variant="dark" onClick={handleClick}>Refresh</Button>{' '}
        </div>
    )
}
export default Weather;