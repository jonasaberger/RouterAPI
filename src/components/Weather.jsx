import { useState } from "react";
import getLocation from "../services/getLocation";
import getWeather from "../services/getWeather";

const Weather = (props) => {

    const [position,setPosition] = useState(["-","-"])
    const [weatherData,setWeatherData] = useState(null)
    const api_key = "ff405c12ed1acb3a636d642065628df0";

    const handleClick = () => {
        getLocation()
            .then(coords => {
                setPosition(coords);
                getWeather(position[0],position[1], api_key)
                .then(data => {
                    if(data) {
                        setWeatherData(data)
                        console.log("HURRAAA")
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
                    <div>{((weatherData.main.temp)-273.15).toFixed(2)}°</div>
                    <div>{weatherData.name}</div>
                </>
            )}
            <button onClick={handleClick}>Refresh</button>
        
        </div>
    )
        
    
}
export default Weather;