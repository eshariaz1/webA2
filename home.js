// DASHBOARD JAVASCRIPT 


let pcity = ""; 

let cunit = "metric"; 

let bchart, lchart, dchart; 

let fdata = null; 


document.getElementById("get-weather-btn").addEventListener("click", function () 
{
   
    const city = document.getElementById("city-input").value.trim();
   
    const unit = document.getElementById("unit-selector").value;

    if (city && city !== pcity) 
        {
        
            fetchingweatherfromapi(city, unit);
        
            pcity = city;
        
            cunit = unit; 
    } 
    else
     {
        showError("Please enter a new city name or avoid repeating the last search.");
    }
});


document.getElementById("unit-selector").addEventListener("change", function () 
{

    const unit = document.getElementById("unit-selector").value; 

    if (pcity)
    {
        
            fetchingweatherfromapi(pcity, unit); 
        
            cunit = unit; 
    }
});




document.getElementById("sort-asc-btn").addEventListener("click", function ()

{


    const sascend = displayingasending(fdata.list);

    displayingsorted(sascend,  cunit); 
});

document.getElementById("sort-desc-btn").addEventListener("click", function ()
 {

    const sdesend = displayingdesecidng(fdata.list);

    displayingsorted(sdesend,  cunit); 
});

document.getElementById("highest-temp-btn").addEventListener("click", function ()
 {

    const tday = dispalyinghightemp(fdata.list);

    displaySingleForecast(tday,  cunit); 
});


document.getElementById("rain-filter-btn").addEventListener("click", function () 
{

    const rday = displayingrain(fdata.list);

    displayingsorted(rday,  cunit); 
});




function showSpinner() 
{
    document.getElementById("loading-spinner").style.display = "block";
}



function hideSpinner()
 {
    document.getElementById("loading-spinner").style.display = "none";
}


function firstlocation() 
{
    if (navigator.geolocation)
         {
        navigator.geolocation.getCurrentPosition(
            (position) => 
            {
                const lat = position.coords.latitude;
            
                const lon = position.coords.longitude;
            
                fetchingweatherbyc(lat, lon,  cunit);
            },
            (error) =>
             {
                console.error("Geolocation error: ", error);
           
                showError("Geolocation not available. Please enter a city manually.");
            }
        );
    } 
    else
    {
        showError("Geolocation is not supported by this browser.");
    }
}


async function fetchingweatherbyc(lat, lon, unit)
 {

    const keyno = '927c526507a62ff44657b277e2d5b5fe'; 

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyno}&units=${unit}`;
    
    try 
    {
    
        showSpinner(); 
    
        const reply = await fetch(url);
        
    
        if (!reply.ok) 
            {
            
                throw new Error("Unable to fetch weather data for your location.");
        }

        const infodata = await reply.json();
        
        if (infodata.cod === 200) 
        {
        
            displayfetchedweather(infodata, unit);
        
            fetching5dayforecast(infodata.name, unit); 
        } 
        else
         {
     
            throw new Error("Location not found. Please try another location.");
     
        }
    }
     catch (error)
      {
    
        console.error(error.message);
    
        showError(error.message);
    }
     finally 
    {
    
        hideSpinner(); 
    }
}




async function fetchingweatherfromapi(city, unit)
 {

    const keyno = '927c526507a62ff44657b277e2d5b5fe'; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyno}&units=${unit}`;

    try {

        showSpinner(); 

        const reply = await fetch(url);
        

        if (!reply.ok)
             {
            
                if (reply.status === 404)
                     {
                throw new Error("City not found");
            }
             else if (reply.status === 429) {
            
                throw new Error("API limit reached. Please try again later.");
            }
             else
         {
                throw new Error("An error occurred while fetching weather data. Please try again later.");
            }
        }

        const infodata = await reply.json();
        
        if (infodata.cod === 200) 
        {
        
            displayfetchedweather(infodata, unit);
        
            fetching5dayforecast(city, unit); 
        } 
        else
         {
    
            throw new Error("City not found. Please enter a valid city.");
    
        }
    } 
    catch (error)
     {
    
        console.error(error.message);
    
        showError(error.message); 

    } 
    finally 
    {

        hideSpinner(); 

    }

}

// function ending of fetching weathwer ki information api se 


window.onload = firstlocation;



function showError(message)
 {

    const weatherdeets = document.getElementById("weather-details");

    weatherDeets.innerHTML = `<p class="error-message">${message}</p>`;
}


function displayfetchedweather(data, unit) 
{

    const weatherdeets = document.getElementById("weather-details");

    const conweather = data.weather[0].main.toLowerCase();

   
    const tempunit = unit === "metric" ? "°C" : "°F";

 
    
    let wclass = "";
    
    if (conweather.includes("cloud"))
     {
    
        wclass = "cloudy";
    
    }
     else if (conweather.includes("rain"))
     {
    
        wclass = "rainy";
    
    } 
    else if (conweather.includes("sun"))
     {
   
        wclass = "sunny";
   
    }

    weatherdeets.innerHTML = `
   
    <h2>${data.name}</h2>
   
        <p>Temperature: ${data.main.temp} ${tempunit}</p>
   
        <p>Humidity: ${data.main.humidity}%</p>
   
        <p>Wind Speed: ${data.wind.speed} m/s</p>
   
        <p>Weather: ${data.weather[0].description}</p>
   
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;
    
   
   
    document.querySelector('.weather-widget').className = `weather-widget ${wclass}`;
}

// function display weather page pe karne ke liye ending 




// fetch api ufnctin 

async function fetching5dayforecast(city, unit)
 {

    const keyno = '927c526507a62ff44657b277e2d5b5fe'; 

    const urllink = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyno}&units=${unit}`;


    try
     {

        const reply = await fetch(urllink);

    
        if (!reply.ok)
             {
            
                if (reply.status === 404) {
            
                    throw new Error("City not found");
            
                }
                
                else if (reply.status === 429)
                 {
                    throw new Error("API limit reached. Please try again later.");
                } 
                
                else 
                 {
                 throw new Error("An error occurred while fetching forecast data.");
               
                }
        }


        fdata = await reply.json(); 
        
        if (fdata && fdata.list)
        {
        
            updatingcharts(fdata, unit); 
        
            displaying5dayforecasegrid(fdata, unit); 
        } 
        else 
        {
            throw new Error("Error fetching forecast data.");
        }
    } 
    catch (error) 
    {
    
        console.error(error.message);
    
        showError(error.message);
    
    }
}


// function ending for the  fetching of the 5 din ke forescase data poop 


// Update charts based on new data and selected unit
/*
function updateC harts(fdata, unit) {
    const labels = [];
    const temps = [];
    const weatherConditions = {};

    // Determine the temperature unit
    const temperatureUnit = unit === "metric" ? "°C" : "°F";

    // Extract relevant data from the forecast for 5 days
    fdata.list.forEach((item, index) => {
        if (index % 8 === 0) { // Taking one forecast for each day (3-hour intervals)
            const date = new Date(item.dt * 1000);
            labels.push(date.toLocaleDateString());

            temps.push(item.main.temp);

            // Count weather conditions for doughnut chart
            const condition = item.weather[0].main.toLowerCase();
            if (weatherConditions[condition]) {
                weatherConditions[condition]++;
            } else {
                weatherConditions[condition] = 1;
            }
        }
    });

    // Destroy existing charts to avoid overlap
    if ( bchart)  bchart.destroy();
    if (dchart) dchart.destroy();
    if (lchart) lchart.destroy();

    // Vertical Bar Chart (Temperatures for the next 5 days)
    const barChartCtx = document.getElementById('bar-chart').getContext('2d');
    bchart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${temperatureUnit})`,
                data: temps,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Doughnut Chart (Weather conditions for the next 5 days)
    const doughnutChartCtx = document.getElementById('doughnut-chart').getContext('2d');
    dchart = new Chart(doughnutChartCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(weatherConditions),
                backgroundColor: [
                    'rgba(241, 219, 247,0.9)',  // Pink for clouds with 80% opacity
                    'rgba(185,226,245)',   // Light blue for clear
                    'rgba(255, 206, 86, 0.8)',   // Yellow for other conditions
                    'rgba(75, 192, 192, 0.8)'    // Light teal for other conditions
                ],
                borderColor: [
                    'rgba(241, 219, 247,0.9)',    // Pink border for clouds
                    'rgba(185,226,245)',     // Blue border for clear
                    'rgba(255, 206, 86, 1)',     // Yellow border
                    'rgba(75, 192, 192, 1)'      // Teal border
                ],
                borderWidth: 1
            }]
        }
    });

    // Line Chart (Temperature changes for the next 5 days)
    const lineChartCtx = document.getElementById('line-chart').getContext('2d');
    lchart = new Chart(lineChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${temperatureUnit})`,
                data: temps,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
}

*/

function updatingcharts(forecast, unit)
 {

    const labels = [];

    const temps = [];

    const conditions = {};  



    const tempunit = unit === "metric" ? "°C" : "°F"; 


    forecast.list.forEach((item, index) => {

        if (index % 8 === 0)
     { 

            const date = new Date(item.dt * 1000);

            labels.push(date.toLocaleDateString());

            temps.push(item.main.temp);

    
    
            const condition = item.weather[0].main.toLowerCase();
    
            if (conditions[condition])
            {
    
                conditions[condition]++;
    
            }
             else
            {
    
                conditions[condition] = 1;
    
            }
        }
    });



    if (bchart) bchart.destroy();
   
    if (dchart) dchart.destroy();
   
    if (lchart) lchart.destroy();

  
   
    const barchart = document.getElementById('bar-chart').getContext('2d');
   
    bchart = new Chart(barchart, {
   
        type: 'bar',
   
        data: {
   
            labels: labels,
   
            datasets: [{
   
                label: `Temperature (${tempunit})`,
   
                data: temps,
   
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
   
                borderColor: 'rgba(75, 192, 192, 1)',
   
                borderWidth: 1
   
            }]
   
        },
   
        options: {
   
            scales: {
   
                y: {
   
                    beginAtZero: true
   
                }
   
            }
   
        }
   
    });

   

   
    const doughnutchart = document.getElementById('doughnut-chart').getContext('2d');
   
    dchart = new Chart(doughnutchart, {
   
        type: 'doughnut',
   
        data: {
            labels: Object.keys(conditions),
   
            datasets: [{
   
                label: 'Weather Conditions',
   
                data: Object.values(conditions),
   
                backgroundColor: [
   
                    'rgba(241, 219, 247,0.9)',  
   
                    'rgba(185,226,245)',  
                    
                    // lue  for clear
   
                    'rgba(255, 206, 86, 0.8)', 
                    
                    // yellow dosri  conditions
   
                    'rgba(75, 192, 192, 0.8)'  
                    
                    //  teal other conditions
   
                ],
   
                borderColor: [
   
                    'rgba(241, 219, 247,0.9)', 
                    
                    // pink  for clouds
   
                    'rgba(185,226,245)',    
                    
                    // bluw for clear
   
                    'rgba(255, 206, 86, 1)',   
                    
                    // yellow border
   
                    'rgba(75, 192, 192, 1)'    
                    
                   
   
                ],
   
                borderWidth: 1
            }]
        }
    });



   
    const linechart = document.getElementById('line-chart').getContext('2d');
   
    lchart = new Chart(linechart, {
   
        type: 'line',
   
        data: {
   
            labels: labels,
   
            datasets: [{
   
                label: `Temperature (${tempunit})`,
   
                data: temps,
   
                fill: false,
   
                borderColor: 'rgba(75, 192, 192, 1)',
   
                tension: 0.1
   
            }]
   
        }
   
    });
}


// function ending of update chart new data ki basis pe 







// grid showing functions 

function displaying5dayforecasegrid(fdata, unit) 
{
  
    const forecastdeets = document.getElementById("forecast-details");
  
    forecastdeets.innerHTML = ""; 

    fdata.list.forEach((item, index) =>
   {
        
        if (index % 8 === 0) 
        { 
            
            const date = new Date(item.dt * 1000);
            
            const temp = item.main.temp;
            
            const condition = item.weather[0].description;
    

            const humidity = item.main.humidity;  
    
            const windspeed = item.wind.speed;    
    
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
            const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    
            const forecastcard = `
    
            <div class="forecast-item">
    
            <h5>${date.toLocaleDateString()} ${time}</h5>
    
                <img src="${icon}" alt="${condition}">
    
                <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
    
                <p>Humidity: ${humidity}%</p>
    
                <p>Wind Speed: ${windspeed} m/s</p>
    
                <p>Condition: ${condition}</p>
    
                </div>
    
            `;
    
            forecastdeets.innerHTML += forecastcard; 
        }
    
    });
}



function displayforecast (fdata, unit) {

    const fdeets = document.getElementById("forecast-details");

    fdeets.innerHTML = ""; 


    fdata.list.forEach((item, index) => 
        {
        
            if (index % 8 === 0)
                
                
                {
        
                const date = new Date(item.dt * 1000);
        
                const temp = item.main.temp;
        
                const weatherCondition = item.weather[0].description;
        
                const humidity = item.main.humidity; 
        
                const windSpeed = item.wind.speed;   
        
                const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
                const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;


            const forecastCard = `
              
            <div class="forecast-item">
            
            <h5>${date.toLocaleDateString()} ${time}</h5>
            
            <img src="${icon}" alt="${weatherCondition}">
            
            <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
            
            <p>Humidity: ${humidity}%</p>
            
            <p>Wind Speed: ${windSpeed} m/s</p>
            
            <p>Condition: ${weatherCondition}</p>
            
            </div>
            
            `;
            fdeets.innerHTML += forecastCard;
        }
    });
}


// displaying forecast ka grid ka fuction ending canit wait for this shit to finish




// shqoing filtered  forecast

function displayingsorted(updatedlist, unit) 
{

    const forecastdeets = document.getElementById("forecast-details");

    forecastdeets.innerHTML = "";


    
    updatedlist.forEach((item) => {
    
        const date = new Date(item.dt * 1000);
    
        const temp = item.main.temp;
    
        const condition = item.weather[0].description;
    
        const humidity = item.main.humidity;
    
        const windspeed = item.wind.speed;
    
        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        const fcard = `
    
        <div class="forecast-item">
    
        <h5>${date.toLocaleDateString()}</h5>
    
        <img src="${icon}" alt="${condition}">
    
        <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
    
        <p>Humidity: ${humidity}%</p>
    
        <p>Wind Speed: ${windspeed} m/s</p>
    
        <p>Condition: ${condition}</p>
    
        </div>
    
        `;
    
        forecastdeets.innerHTML += fcard;
    });
}


// sorted forescast function ending yippeee 

function dForecast(sortedList, unit) {

    const forecastDetails = document.getElementById("forecast-details");

    forecastDetails.innerHTML = ""; 

    sortedList.forEach((item) => {

        const date = new Date(item.dt * 1000);

        const temp = item.main.temp;

        const weatherCondition = item.weather[0].description;

        const humidity = item.main.humidity;

        const windSpeed = item.wind.speed;

        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;


        
        const forecastCard = `
        
        <div class="forecast-item">
        
        <h5>${date.toLocaleDateString()}</h5>
        
        <img src="${icon}" alt="${weatherCondition}">
        
        <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
        
        <p>Humidity: ${humidity}%</p>
        
        <p>Wind Speed: ${windSpeed} m/s</p>
        
        <p>Condition: ${weatherCondition}</p>
        
        </div>
        `;
        forecastDetails.innerHTML += forecastCard;
    });
}

//  ex sorted forescast function ending yippeee 




// Display a single day forecast (for highest temperature)

function displaySingleForecast(item, unit) {

    const forecastDetails = document.getElementById("forecast-details");

    forecastDetails.innerHTML = ""; // Clear previous results


    
    const date = new Date(item.dt * 1000);
    
    const temp = item.main.temp;
    
    const weatherCondition = item.weather[0].description;
    
    const humidity = item.main.humidity;
    
    const windSpeed = item.wind.speed;
    
    const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;


    
    const forecastCard = `
    
    <div class="forecast-item">
    
    <h5>${date.toLocaleDateString()}</h5>
    
    <img src="${icon}" alt="${weatherCondition}">
    
    <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
    
    <p>Humidity: ${humidity}%</p>
    
    <p>Wind Speed: ${windSpeed} m/s</p>
    
    <p>Condition: ${weatherCondition}</p>
    
    </div>
    
    `;
    
    forecastDetails.innerHTML += forecastCard;
}




// Sorting functions

function displayingasending(forecastList) 
{

    return forecastList

    .filter((item, index) => index % 8 === 0) 

        .sort((a, b) => a.main.temp - b.main.temp);
}

function displayingdesecidng(forecastList)
{
    
    return forecastList


    .filter((item, index) => index % 8 === 0)

        .sort((a, b) => b.main.temp - a.main.temp); 

}


function displayingrain(forecastList) 
{

    return forecastList

    .filter((item, index) => index % 8 === 0)

        .filter(item => item.weather[0].main.toLowerCase().includes('rain')); 
}


function dispalyinghightemp(forecastList)
{

    return forecastList.reduce((max, item) => (item.main.temp > max.main.temp ? item : max));
}



// EXTRA ANIMATION  FUNCTIONS 

window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.weather-widget, .chart-container');
    elements.forEach(el => {
        el.style.opacity = '1';  // Ensure visibility
    });

    // Animate weather icon bounce on hover
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.addEventListener('mouseenter', () => {
        weatherIcon.style.animation = 'bounce 1.5s infinite';
    });

    weatherIcon.addEventListener('mouseleave', () => {
        weatherIcon.style.animation = '';
    });
});

/*
function displayWeatherIcon(weatherDescription) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `<div class="cloud"></div>`;

    if (weatherDescription.includes('cloud')) {
        document.querySelector('.cloud').style.display = 'block';
    }
}
*/

/*

function triggerWeatherAnimation(weather) {
    const cloud = document.querySelector('.cloud');
    const sun = document.querySelector('.sun');
    const raindrops = document.querySelector('.raindrops');

    // Reset visibility
    cloud.style.display = 'none';
    sun.style.display = 'none';
    raindrops.style.display = 'none';

    if (weather.includes('cloud')) {
        cloud.style.display = 'block';
    } else if (weather.includes('clear')) {
        sun.style.display = 'block';
    } else if (weather.includes('rain')) {
        raindrops.style.display = 'block';
    }
}

// Example: Trigger animation based on a mock weather condition
window.onload = () => {
    // Call this function after you fetch weather data
    triggerWeatherAnimation('clear sky');
};
*/














/*
// old version
let previousCity = ""; // Store the last entered city globally
let currentUnit = "metric"; // Store the current temperature unit
let barChart, lineChart, doughnutChart; // Store the chart instances to update dynamically
let forecastData = null; // Global variable to store forecast data


// Event listener for "Get Weather" button
document.getElementById("get-weather-btn").addEventListener("click", function () {
    const city = document.getElementById("city-input").value.trim();
    const unit = document.getElementById("unit-selector").value; // Get selected unit (metric or imperial)
    if (city && city !== previousCity) {
        fetchWeather(city, unit);
        previousCity = city;
        currentUnit = unit; // Update the global current unit
    } else {
        showError("Please enter a new city name or avoid repeating the last search.");
    }
});


// Event listener for unit selection (Celsius/Fahrenheit)
document.getElementById("unit-selector").addEventListener("change", function () {
    const unit = document.getElementById("unit-selector").value; // Get selected unit (metric or imperial)
    if (previousCity) {
        fetchWeather(previousCity, unit); // Fetch the weather again when the unit changes
        currentUnit = unit; // Update the global current unit
    }
});

// Add event listeners for filter buttons
document.getElementById("sort-asc-btn").addEventListener("click", function () {
    const sortedAscending = showAscendingTemperatures(forecastData.list);
    displaySortedForecast(sortedAscending, currentUnit); // Use global currentUnit
});

document.getElementById("sort-desc-btn").addEventListener("click", function () {
    const sortedDescending = showDescendingTemperatures(forecastData.list);
    displaySortedForecast(sortedDescending, currentUnit); // Use global currentUnit
});

document.getElementById("highest-temp-btn").addEventListener("click", function () {
    const highestTempDay = showHighestTemperature(forecastData.list);
    displaySingleForecast(highestTempDay, currentUnit); // Use global currentUnit
});

document.getElementById("rain-filter-btn").addEventListener("click", function () {
    const rainDays = filterRainDays(forecastData.list);
    displaySortedForecast(rainDays, currentUnit); // Use global currentUnit
});


// Function to show the loading spinner
function showSpinner() {
    document.getElementById("loading-spinner").style.display = "block";
}

// Function to hide the loading spinner
function hideSpinner() {
    document.getElementById("loading-spinner").style.display = "none";
}


// Function to get the user's location using Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon, currentUnit);
            },
            (error) => {
                console.error("Geolocation error: ", error);
                showError("Geolocation not available. Please enter a city manually.");
            }
        );
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

// Fetch weather data based on latitude and longitude
async function fetchWeatherByCoords(lat, lon, unit) {
    const apiKey = '927c526507a62ff44657b277e2d5b5fe'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    
    try {
        showSpinner(); // Show the loading spinner
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Unable to fetch weather data for your location.");
        }

        const data = await response.json();
        if (data.cod === 200) {
            displayWeatherData(data, unit);
            fetchForecast(data.name, unit); // Fetch forecast data to fill the charts
        } else {
            throw new Error("Location not found. Please try another location.");
        }
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    } finally {
        hideSpinner(); // Hide the loading spinner
    }
}

// Fetch weather data from OpenWeather API
async function fetchWeather(city, unit) {
    const apiKey = '927c526507a62ff44657b277e2d5b5fe'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
        showSpinner(); // Show the loading spinner
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else if (response.status === 429) {
                throw new Error("API limit reached. Please try again later.");
            } else {
                throw new Error("An error occurred while fetching weather data. Please try again later.");
            }
        }

        const data = await response.json();
        if (data.cod === 200) {
            displayWeatherData(data, unit);
            fetchForecast(city, unit); // Fetch forecast data to fill the charts
        } else {
            throw new Error("City not found. Please enter a valid city.");
        }
    } catch (error) {
        console.error(error.message);
        showError(error.message); // Display the error message to the user
    } finally {
        hideSpinner(); // Hide the loading spinner
    }
}

// Call the geolocation function on page load to fetch the weather for user's location
window.onload = getLocation;

// Show user-friendly error messages
function showError(message) {
    const weatherDetails = document.getElementById("weather-details");
    weatherDetails.innerHTML = `<p class="error-message">${message}</p>`;
}

// Display the fetched weather data on the webpage
function displayWeatherData(data, unit) {
    const weatherDetails = document.getElementById("weather-details");
    const weatherCondition = data.weather[0].main.toLowerCase();

    // Determine the temperature unit
    const temperatureUnit = unit === "metric" ? "°C" : "°F";

    // Dynamic background change based on weather conditions
    let widgetClass = "";
    if (weatherCondition.includes("cloud")) {
        widgetClass = "cloudy";
    } else if (weatherCondition.includes("rain")) {
        widgetClass = "rainy";
    } else if (weatherCondition.includes("sun")) {
        widgetClass = "sunny";
    }

    weatherDetails.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} ${temperatureUnit}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;
    
    // Apply the dynamic background class
    document.querySelector('.weather-widget').className = `weather-widget ${widgetClass}`;
}

// Fetch 5-day forecast from OpenWeather API to fill charts
async function fetchForecast(city, unit) {
    const apiKey = '927c526507a62ff44657b277e2d5b5fe'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else if (response.status === 429) {
                throw new Error("API limit reached. Please try again later.");
            } else {
                throw new Error("An error occurred while fetching forecast data.");
            }
        }

        forecastData = await response.json(); // Store forecastData globally
        if (forecastData && forecastData.list) {
            updateCharts(forecastData, unit); // Display charts based on forecast data
            displayForecastGrid(forecastData, unit); // Display the forecast grid
        } else {
            throw new Error("Error fetching forecast data.");
        }
    } catch (error) {
        console.error(error.message);
        showError(error.message); // Display the error message to the user
    }
}

// Update charts based on new data and selected unit
function updateCharts(forecastData, unit) {
    const labels = [];
    const temps = [];
    const weatherConditions = {};

    // Determine the temperature unit
    const temperatureUnit = unit === "metric" ? "°C" : "°F";

    // Extract relevant data from the forecast for 5 days
    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) { // Taking one forecast for each day (3-hour intervals)
            const date = new Date(item.dt * 1000);
            labels.push(date.toLocaleDateString());

            temps.push(item.main.temp);

            // Count weather conditions for doughnut chart
            const condition = item.weather[0].main.toLowerCase();
            if (weatherConditions[condition]) {
                weatherConditions[condition]++;
            } else {
                weatherConditions[condition] = 1;
            }
        }
    });

    // Destroy existing charts to avoid overlap
    if (barChart) barChart.destroy();
    if (doughnutChart) doughnutChart.destroy();
    if (lineChart) lineChart.destroy();

    // Vertical Bar Chart (Temperatures for the next 5 days)
    const barChartCtx = document.getElementById('bar-chart').getContext('2d');
    barChart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${temperatureUnit})`,
                data: temps,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Doughnut Chart (Weather conditions for the next 5 days)
    const doughnutChartCtx = document.getElementById('doughnut-chart').getContext('2d');
    doughnutChart = new Chart(doughnutChartCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(weatherConditions),
                backgroundColor: [
                    'rgba(241, 219, 247,0.9)',  // Pink for clouds with 80% opacity
                    'rgba(185,226,245)',   // Light blue for clear
                    'rgba(255, 206, 86, 0.8)',   // Yellow for other conditions
                    'rgba(75, 192, 192, 0.8)'    // Light teal for other conditions
                ],
                borderColor: [
                    'rgba(241, 219, 247,0.9)',    // Pink border for clouds
                    'rgba(185,226,245)',     // Blue border for clear
                    'rgba(255, 206, 86, 1)',     // Yellow border
                    'rgba(75, 192, 192, 1)'      // Teal border
                ],
                borderWidth: 1
            }]
        }
    });

    // Line Chart (Temperature changes for the next 5 days)
    const lineChartCtx = document.getElementById('line-chart').getContext('2d');
    lineChart = new Chart(lineChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${temperatureUnit})`,
                data: temps,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
}

// Display the 5-day weather forecast in grid format
function displayForecastGrid(forecastData, unit) {
    const forecastDetails = document.getElementById("forecast-details");
    forecastDetails.innerHTML = ""; // Clear previous forecasts

    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) { // Every 8th entry for each day
            const date = new Date(item.dt * 1000);
            const temp = item.main.temp;
            const weatherCondition = item.weather[0].description;
            const humidity = item.main.humidity;  // Adding Humidity data
            const windSpeed = item.wind.speed;    // Adding Wind Speed data
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

            const forecastCard = `
                <div class="forecast-item">
                    <h5>${date.toLocaleDateString()} ${time}</h5>
                    <img src="${icon}" alt="${weatherCondition}">
                    <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Condition: ${weatherCondition}</p>
                </div>
            `;
            forecastDetails.innerHTML += forecastCard; // Add forecast items
        }
    });
}

// Display the sorted or filtered forecast
function displaySortedForecast(sortedList, unit) {
    const forecastDetails = document.getElementById("forecast-details");
    forecastDetails.innerHTML = ""; // Clear previous results

    sortedList.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const temp = item.main.temp;
        const weatherCondition = item.weather[0].description;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;
        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        const forecastCard = `
            <div class="forecast-item">
                <h5>${date.toLocaleDateString()}</h5>
                <img src="${icon}" alt="${weatherCondition}">
                <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Condition: ${weatherCondition}</p>
            </div>
        `;
        forecastDetails.innerHTML += forecastCard;
    });
}

// Display a single day forecast (for highest temperature)
function displaySingleForecast(item, unit) {
    const forecastDetails = document.getElementById("forecast-details");
    forecastDetails.innerHTML = ""; // Clear previous results

    const date = new Date(item.dt * 1000);
    const temp = item.main.temp;
    const weatherCondition = item.weather[0].description;
    const humidity = item.main.humidity;
    const windSpeed = item.wind.speed;
    const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    const forecastCard = `
        <div class="forecast-item">
            <h5>${date.toLocaleDateString()}</h5>
            <img src="${icon}" alt="${weatherCondition}">
            <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Condition: ${weatherCondition}</p>
        </div>
    `;
    forecastDetails.innerHTML += forecastCard;
}

// Sorting functions
function showAscendingTemperatures(forecastList) {
    return forecastList
        .filter((item, index) => index % 8 === 0) // Filter to show one forecast per day
        .sort((a, b) => a.main.temp - b.main.temp); // Sort temperatures ascending
}

function showDescendingTemperatures(forecastList) {
    return forecastList
        .filter((item, index) => index % 8 === 0)
        .sort((a, b) => b.main.temp - a.main.temp); // Sort temperatures descending
}

function filterRainDays(forecastList) {
    return forecastList
        .filter((item, index) => index % 8 === 0)
        .filter(item => item.weather[0].main.toLowerCase().includes('rain')); // Only show rainy days
}

function showHighestTemperature(forecastList) {
    return forecastList.reduce((max, item) => (item.main.temp > max.main.temp ? item : max));
}

*/
/*
// dashboard javascript

let prevcity = ""; // Store the last entered city globally
let unit = "metric"; // Store the current temperature unit
let barchart, linechart, doughnutchart; // Store the chart instances to update dynamically
let forecastdata = null; // Global variable to store forecast data

// Event listener for "Get Weather" button
document.getElementById("get-weather-btn").addEventListener("click", function () {
    const city = document.getElementById("city-input").value.trim();
    const selectedunit = document.getElementById("unit-selector").value; // Get selected unit (metric or imperial)
    if (city && city !== prevcity) {
        fetchweather(city, selectedunit);
        prevcity = city;
        unit = selectedunit; // Update the global current unit
    } else {
        showerror("Please enter a new city name or avoid repeating the last search.");
    }
});

// Event listener for unit selection (Celsius/Fahrenheit)
document.getElementById("unit-selector").addEventListener("change", function () {
    const selectedunit = document.getElementById("unit-selector").value; // Get selected unit (metric or imperial)
    if (prevcity) {
        fetchweather(prevcity, selectedunit); // Fetch the weather again when the unit changes
        unit = selectedunit; // Update the global current unit
    }
});

// Add event listeners for filter buttons
document.getElementById("sort-asc-btn").addEventListener("click", function () {
    const sortedasc = sortasc(forecastdata.list);
    displaysortedforecast(sortedasc, unit); // Use global unit
});

document.getElementById("sort-desc-btn").addEventListener("click", function () {
    const sorteddesc = sortdesc(forecastdata.list);
    displaysortedforecast(sorteddesc, unit); // Use global unit
});

document.getElementById("highest-temp-btn").addEventListener("click", function () {
    const highestday = showhighesttemp(forecastdata.list);
    displaysingleforecast(highestday, unit); // Use global unit
});

document.getElementById("rain-filter-btn").addEventListener("click", function () {
    const raindays = filterraindays(forecastdata.list);
    displaysortedforecast(raindays, unit); // Use global unit
});

// Function to show the loading spinner
function showspinner() {
    document.getElementById("loading-spinner").style.display = "block";
}

// Function to hide the loading spinner
function hidespinner() {
    document.getElementById("loading-spinner").style.display = "none";
}

// Function to get the user's location using Geolocation API
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchweatherbycoords(lat, lon, unit);
            },
            (error) => {
                console.error("Geolocation error: ", error);
                showerror("Geolocation not available. Please enter a city manually.");
            }
        );
    } else {
        showerror("Geolocation is not supported by this browser.");
    }
}


// Fetch weather data based on latitude and longitude
async function fetchweatherbycoords(lat, lon, unit) {
    const apikey = '927c526507a62ff44657b277e2d5b5fe'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${unit}`;

    try {
        showspinner(); // Show the loading spinner
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch weather data for your location.");
        }

        const data = await response.json();
        if (data.cod === 200) {
            displayweatherdata(data, unit);
            fetchforecast(data.name, unit); // Fetch forecast data to fill the charts
        } else {
            throw new Error("Location not found. Please try another location.");
        }
    } catch (error) {
        console.error(error.message);
        showerror(error.message);
    } finally {
        hidespinner(); // Hide the loading spinner
    }
}

// Fetch weather data from OpenWeather API
async function fetchweather(city, unit) {
    const apikey = '927c526507a62ff44657b277e2d5b5fe'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;

    try {
        showspinner(); // Show the loading spinner
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else if (response.status === 429) {
                throw new Error("API limit reached. Please try again later.");
            } else {
                throw new Error("An error occurred while fetching weather data. Please try again later.");
            }
        }

        const data = await response.json();
        if (data.cod === 200) {
            displayweatherdata(data, unit);
            fetchforecast(city, unit); // Fetch forecast data to fill the charts
        } else {
            throw new Error("City not found. Please enter a valid city.");
        }
    } catch (error) {
        console.error(error.message);
        showerror(error.message); // Display the error message to the user
    } finally {
        hidespinner(); // Hide the loading spinner
    }
}

// Show user-friendly error messages
function showerror(message) {
    const weatherdetails = document.getElementById("weather-details");
    weatherdetails.innerHTML = `<p class="error-message">${message}</p>`;
}

// Display the fetched weather data on the webpage
function displayweatherdata(data, unit) {
    const weatherdetails = document.getElementById("weather-details");
    const weathercondition = data.weather[0].main.toLowerCase();

    // Determine the temperature unit
    const tempunit = unit === "metric" ? "°C" : "°F";

    // Dynamic background change based on weather conditions
    let widgetclass = "";
    if (weathercondition.includes("cloud")) {
        widgetclass = "cloudy";
    } else if (weathercondition.includes("rain")) {
        widgetclass = "rainy";
    } else if (weathercondition.includes("sun")) {
        widgetclass = "sunny";
    }

    weatherdetails.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} ${tempunit}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;

    // Apply the dynamic background class
    document.querySelector('.weather-widget').className = `weather-widget ${widgetclass}`;
}

// Fetch 5-day forecast from OpenWeather API to fill charts
async function fetchforecast(city, unit) {
    const apikey = '927c526507a62ff44657b277e2d5b5fe'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=${unit}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else if (response.status === 429) {
                throw new Error("API limit reached. Please try again later.");
            } else {
                throw new Error("An error occurred while fetching forecast data.");
            }
        }

        forecastdata = await response.json(); // Store forecastdata globally
        if (forecastdata && forecastdata.list) {
            updatecharts(forecastdata, unit); // Display charts based on forecast data
            displayforecastgrid(forecastdata, unit); // Display the forecast grid
        } else {
            throw new Error("Error fetching forecast data.");
        }
    } catch (error) {
        console.error(error.message);
        showerror(error.message); // Display the error message to the user
    }
}

// Update charts based on new data and selected unit
function updatecharts(forecastdata, unit) {
    const labels = [];
    const temps = [];
    const weatherconditions = {};

    // Determine the temperature unit
    const tempunit = unit === "metric" ? "°C" : "°F";

    // Extract relevant data from the forecast for 5 days
    forecastdata.list.forEach((item, index) => {
        if (index % 8 === 0) { // Taking one forecast for each day (3-hour intervals)
            const date = new Date(item.dt * 1000);
            labels.push(date.toLocaleDateString());

            temps.push(item.main.temp);

            // Count weather conditions for doughnut chart
            const condition = item.weather[0].main.toLowerCase();
            if (weatherconditions[condition]) {
                weatherconditions[condition]++;
            } else {
                weatherconditions[condition] = 1;
            }
        }
    });

    // Destroy existing charts to avoid overlap
    if (barchart) barchart.destroy();
    if (doughnutchart) doughnutchart.destroy();
    if (linechart) linechart.destroy();

    // Vertical Bar Chart (Temperatures for the next 5 days)
    const barchartctx = document.getElementById('bar-chart').getContext('2d');
    barchart = new Chart(barchartctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${tempunit})`,
                data: temps,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Doughnut Chart (Weather conditions for the next 5 days)
    const doughnutchartctx = document.getElementById('doughnut-chart').getContext('2d');
    doughnutchart = new Chart(doughnutchartctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherconditions),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(weatherconditions),
                backgroundColor: [
                    'rgba(241, 219, 247,0.9)',  // Pink for clouds with 80% opacity
                    'rgba(185,226,245)',   // Light blue for clear
                    'rgba(255, 206, 86, 0.8)',   // Yellow for other conditions
                    'rgba(75, 192, 192, 0.8)'    // Light teal for other conditions
                ],
                borderColor: [
                    'rgba(241, 219, 247,0.9)',    // Pink border for clouds
                    'rgba(185,226,245)',     // Blue border for clear
                    'rgba(255, 206, 86, 1)',     // Yellow border
                    'rgba(75, 192, 192, 1)'      // Teal border
                ],
                borderWidth: 1
            }]
        }
    });

    // Line Chart (Temperature changes for the next 5 days)
    const linechartctx = document.getElementById('line-chart').getContext('2d');
    linechart = new Chart(linechartctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${tempunit})`,
                data: temps,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
}

// Display the 5-day weather forecast in grid format
function displayforecastgrid(forecastdata, unit) {
    const forecastdetails = document.getElementById("forecast-details");
    forecastdetails.innerHTML = ""; // Clear previous forecasts

    forecastdata.list.forEach((item, index) => {
        if (index % 8 === 0) { // Every 8th entry for each day
            const date = new Date(item.dt * 1000);
            const temp = item.main.temp;
            const weathercondition = item.weather[0].description;
            const humidity = item.main.humidity;  // Adding Humidity data
            const windspeed = item.wind.speed;    // Adding Wind Speed data
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

            const forecastcard = `
                <div class="forecast-item">
                    <h5>${date.toLocaleDateString()} ${time}</h5>
                    <img src="${icon}" alt="${weathercondition}">
                    <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windspeed} m/s</p>
                    <p>Condition: ${weathercondition}</p>
                </div>
            `;
            forecastdetails.innerHTML += forecastcard; // Add forecast items
        }
    });
}

// Display the sorted or filtered forecast
function displaysortedforecast(sortedlist, unit) {
    const forecastdetails = document.getElementById("forecast-details");
    forecastdetails.innerHTML = ""; // Clear previous results

    sortedlist.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const temp = item.main.temp;
        const weathercondition = item.weather[0].description;
        const humidity = item.main.humidity;
        const windspeed = item.wind.speed;
        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        const forecastcard = `
            <div class="forecast-item">
                <h5>${date.toLocaleDateString()}</h5>
                <img src="${icon}" alt="${weathercondition}">
                <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windspeed} m/s</p>
                <p>Condition: ${weathercondition}</p>
            </div>
        `;
        forecastdetails.innerHTML += forecastcard;
    });
}

// Display a single day forecast (for highest temperature)
function displaysingleforecast(item, unit) {
    const forecastdetails = document.getElementById("forecast-details");
    forecastdetails.innerHTML = ""; // Clear previous results

    const date = new Date(item.dt * 1000);
    const temp = item.main.temp;
    const weathercondition = item.weather[0].description;
    const humidity = item.main.humidity;
    const windspeed = item.wind.speed;
    const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    const forecastcard = `
        <div class="forecast-item">
            <h5>${date.toLocaleDateString()}</h5>
            <img src="${icon}" alt="${weathercondition}">
            <p>Temp: ${temp} ${unit === 'metric' ? '°C' : '°F'}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windspeed} m/s</p>
            <p>Condition: ${weathercondition}</p>
        </div>
    `;
    forecastdetails.innerHTML += forecastcard;
}

// Sorting functions
function sortasc(forecastlist) {
    return forecastlist
        .filter((item, index) => index % 8 === 0) // Filter to show one forecast per day
        .sort((a, b) => a.main.temp - b.main.temp); // Sort temperatures ascending
}

function sortdesc(forecastlist) {
    return forecastlist
        .filter((item, index) => index % 8 === 0)
        .sort((a, b) => b.main.temp - a.main.temp); // Sort temperatures descending
}

function filterraindays(forecastlist) {
    return forecastlist
        .filter((item, index) => index % 8 === 0)
        .filter(item => item.weather[0].main.toLowerCase().includes('rain')); // Only show rainy days
}

function showhighesttemp(forecastlist) {
    return forecastlist.reduce((max, item) => (item.main.temp > max.main.temp ? item : max));
}
*/