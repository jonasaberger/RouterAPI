import { useState } from "react";
import getLocation from "../services/getLocation";
import getWeather from "../services/getWeather";
import rainImage from "../assets/Rain.png"
import clearImage from "../assets/Sunny.png"
import stormImage from "../assets/Storm.png"
import cloudImage from "../assets/Clouds.png"
import getWeatherIcon from "../services/getWeatherIcon";

const Weather = (props) => {
    const [position,setPosition] = useState(["-","-"])
    const [weatherData,setWeatherData] = useState(null)
    const [weatherImage,setWeatherImage] = useState(null)

    const api_key = "ff405c12ed1acb3a636d642065628df0";


    const handleClick = () => {
        getLocation()
            .then(coords => {
                setPosition(coords);
                getWeather(position[0],position[1], api_key)
                .then(data => {
                    if(data) {
                        // Success

                        // Setting the Weather Data
                        setWeatherData(data)
                        
                        getWeatherIcon(data.weather[0].icon)
                        .then (weatherIcon => {
                            setWeatherImage(weatherIcon.url)
                        })

                        // Get the appropriate Weather-Image
                        if(data.weather[0].main === "Clear") {
                            setWeatherImage(clearImage)
                        }
                        else if(data.weather[0].main === 'Clouds') {
                            setWeatherImage(cloudImage)
                        }
                        else if(data.weather[0].main === 'Rain') {
                            setWeatherImage(rainImage)
                        }
                        else if(data.weather[0].main === 'Storm') {
                            setWeatherImage(stormImage)
                        }
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
        <div className="WeatherContainer">
            <h2 className="WeatherTitle">Weather-Display</h2>

            {weatherData && (
                <>
                    <img src={weatherImage} alt="Weather" />
                
                    <div>{((weatherData.main.temp)-273.15).toFixed(2)}°</div>
                    <div>{weatherData.name}</div>
                </>
            )}
            <button onClick={handleClick}>Refresh</button>
        </div>
    )
        
    
}
export default Weather;