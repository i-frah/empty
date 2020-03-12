//select elements using DOM events .querySelector
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//app data - object
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//const variable for temp conversion
const KELVIN = 273;

// API key from openweathermap.org
const key = "82005d27a116c2880c8f0fcb866998a0"

// geolocation checking first / make sure to turn off ad blocker if installed

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);

}else{
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support geolocation<p>";

}

//this will set the user's postion where ever you are in
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//show error if problem with the service
function showError(error){
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

//grab data
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


    //below is an object
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconID = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}


//this function will show the data in the ui with the icons
function displayWeather(){
    iconElement.innerHTML = `<img scr="icons/${weather.iconID}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}


function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;

}



tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
}
);