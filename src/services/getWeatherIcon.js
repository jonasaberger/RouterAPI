const getWeatherIcon = (icon) => {
    const apiUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        });
}
export default getWeatherIcon