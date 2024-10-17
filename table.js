/*
let weatherData = []; // This will store the forecast data

// OpenWeather API details
const openWeatherApiKey = '927c526507a62ff44657b277e2d5b5fe'; // Your OpenWeather API Key

// Gemini API details
const geminiApiKey = 'AIzaSyDlWT9Oye7qDW_QDeuIlKT2mBOOegk-ENA'; // Your Gemini API key

// Function to fetch weather data from OpenWeather API
async function fetchWeather(city, unit = 'metric') {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=${unit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to call Gemini API for non-weather queries
async function callGeminiApi(query) {
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1-5:generateText?key=${geminiApiKey}`;
    const body = {
        prompt: {
            text: query
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.candidates?.[0]?.output || "No output from the Gemini API"; // Safely access the response
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return `Sorry, there was an issue: ${error.message}`;
    }
}

// Function to populate the table with weather data
function populateTable(data, page = 1) {
    const rowsPerPage = 10;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const tableBody = document.querySelector("#weather-table tbody");
    tableBody.innerHTML = ""; // Clear previous table content

    data.slice(startIndex, endIndex).forEach(entry => {
        const row = `
            <tr>
                <td>${entry.dt_txt}</td>
                <td>${entry.main.temp} °C</td>
                <td>${entry.weather[0].description}</td>
                <td>${entry.main.humidity} %</td>
                <td>${entry.wind.speed} m/s</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to handle chatbot response
async function chatbotResponse(question) {
    let response = "";

    // Check if the query is about weather
    if (question.toLowerCase().includes("weather")) {
        const city = question.split("in")[1]?.trim(); // Extract the city name from the query (assuming format like "weather in London")
        if (city) {
            const weatherData = await fetchWeather(city);
            if (weatherData && weatherData.main) {
                response = `The weather in ${city} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C.`;
            } else {
                response = "Sorry, I couldn't fetch the weather data for that city.";
            }
        } else {
            response = "Please specify a city for weather information.";
        }
    } else {
        // Call Gemini API for non-weather queries
        response = await callGeminiApi(question);
    }

    // Display the chatbot response
    document.getElementById("chat-output").innerHTML += `<p>${response}</p>`;
}

// Pagination buttons
let currentPage = 1;
document.getElementById("next-page-btn").addEventListener("click", () => {
    if (currentPage * 10 < weatherData.length) {
        currentPage++;
        populateTable(weatherData, currentPage);
    }
});

document.getElementById("prev-page-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        populateTable(weatherData, currentPage);
    }
});

// Chatbot event listener
document.getElementById("send-chat-btn").addEventListener("click", () => {
    const userInput = document.getElementById("chat-input-field").value;
    chatbotResponse(userInput);
   // document.getElementById("chat-input-field").value = ""; // Clear input field
});
*/

/*
let weatherData = []; // This will store the forecast data

// OpenWeather API details
const openWeatherApiKey = '927c526507a62ff44657b277e2d5b5fe'; // Your OpenWeather API Key

// Gemini API details
const geminiApiKey = 'AIzaSyDlWT9Oye7qDW_QDeuIlKT2mBOOegk-ENA'; // Your Gemini API key

// Function to fetch weather data from OpenWeather API
async function fetchWeather(city, unit = "metric") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=${unit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Weather API Response:", data); // Log response for debugging
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to call Gemini API for non-weather queries
async function callGeminiApi(query) {
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1-5:generateText?key=${'AIzaSyDlWT9Oye7qDW_QDeuIlKT2mBOOegk-ENA'}`;
    const body = {
        prompt: {
            text: query
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Gemini API Response:", data); // Log response for debugging
        return data.candidates?.[0]?.output || "No output from the Gemini API"; // Safely access the response
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return `Sorry, there was an issue: ${error.message}`;
    }
}

// Improved function to detect weather query and extract city
function detectWeatherQuery(question) {
    const queryLower = question.toLowerCase();
    if (queryLower.includes("weather") || queryLower.includes("forecast") || queryLower.includes("temperature")) {
        const city = extractCity(question);
        return city ? city : "Please specify a city for weather information.";
    }
    return null;
}

// Helper function to extract city from the query
function extractCity(question) {
    const prepositions = ["in", "at", "for", "like"];
    let city = null;

    // Try to find the city after common prepositions
    for (const prep of prepositions) {
        const index = question.toLowerCase().indexOf(prep);
        if (index !== -1) {
            city = question.slice(index + prep.length).trim().split(" ")[0]; // Take the first word after the preposition
            break;
        }
    }

    return city ? city : null;
}


// Function to handle chatbot response
async function chatbotResponse(question) {
    let response = "";

    // Check if the query is about weather
    const city = detectWeatherQuery(question);
    if (city && typeof city === "string") {
        if (city === "Please specify a city for weather information.") {
            response = city;
        } else {
            const weatherData = await fetchWeather(city);
            if (weatherData && weatherData.main) {
                response = `The weather in ${city} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C.`;
            } else {
                response = "Sorry, I couldn't fetch the weather data for that city.";
            }
        }
    } else {
        // Call Gemini API for non-weather queries
        response = await callGeminiApi(question);
    }

    // Display the chatbot response
    document.getElementById("chat-output").innerHTML += `<p>${response}</p>`;
}

// Function to populate the table with weather data
function populateTable(data, page = 1) {
    const rowsPerPage = 10;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const tableBody = document.querySelector("#weather-table tbody");
    tableBody.innerHTML = ""; // Clear previous table content

    data.slice(startIndex, endIndex).forEach(entry => {
        const row = `
            <tr>
                <td>${entry.dt_txt}</td>
                <td>${entry.main.temp} °C</td>
                <td>${entry.weather[0].description}</td>
                <td>${entry.main.humidity} %</td>
                <td>${entry.wind.speed} m/s</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Pagination buttons
let currentPage = 1;
document.getElementById("next-page-btn").addEventListener("click", () => {
    if (currentPage * 10 < weatherData.length) {
        currentPage++;
        populateTable(weatherData, currentPage);
    }
});

document.getElementById("prev-page-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        populateTable(weatherData, currentPage);
    }
});

// Chatbot event listener
document.getElementById("send-chat-btn").addEventListener("click", () => {
    const userInput = document.getElementById("chat-input-field").value;
    chatbotResponse(userInput);
    document.getElementById("chat-input-field").value = ""; // Clear input field
});



// EXTRA 

// Improved function to detect weather query and extract city
function detectWeather(question) {
    const queryLower = question.toLowerCase();
    if (queryLower.includes("weather")) {
        const city = extractCity(question);
        return city ? city : "Please specify a city for weather information.";
    }
    return null;
}

// Helper function to extract city from the query
function extract(question) {
    const prepositions = ["in", "at", "for"];
    let city = null;

    // Try to find the city after common prepositions
    for (const prep of prepositions) {
        const index = question.toLowerCase().indexOf(prep);
        if (index !== -1) {
            city = question.slice(index + prep.length).trim().split(" ")[0]; // Take the first word after the preposition
            break;
        }
    }

    return city ? city : null;
}

*/
/*
let weatherData = []; // This will store the forecast data

// OpenWeather API details
const openWeatherApiKey = '927c526507a62ff44657b277e2d5b5fe'; // Your OpenWeather API Key

const geminiApiKey = 'AIzaSyCsCurK3tYwxEXdbK7UhPUNi0rQ5OnNkyg'; // Your new API key
const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCsCurK3tYwxEXdbK7UhPUNi0rQ5OnNkyg`;


// Function to fetch weather data from OpenWeather API
async function fetchWeather(city, unit = "metric") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=${unit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Weather API Response:", data); // Log response for debugging
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Updated Gemini API request
async function callGeminiApi(query) {
    try {
        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: { text: query }
            }),
        });

        const data = await response.json();
        console.log("Gemini API Response:", data); // Log response for debugging

        // Check for valid candidates in the response
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].output || "No output found in candidates.";
        } else {
            console.error("No candidates found in the response:", data);
            return "Sorry, no valid candidates were returned by the Gemini API.";
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return `Sorry, there was an issue: ${error.message}`;
    }
}


// Improved function to detect weather query and extract city
function detectWeatherQuery(question) {
    const queryLower = question.toLowerCase();
    if (queryLower.includes("weather") || queryLower.includes("forecast") || queryLower.includes("temperature")) {
        const city = extractCity(question);
        return city ? city : "Please specify a city for weather information.";
    }
    return null;
}

// Helper function to extract city from the query
function extractCity(question) {
    const prepositions = ["in", "at", "for", "like"];
    let city = null;

    // Try to find the city after common prepositions
    for (const prep of prepositions) {
        const index = question.toLowerCase().indexOf(prep);
        if (index !== -1) {
            city = question.slice(index + prep.length).trim().split(" ")[0]; // Take the first word after the preposition
            break;
        }
    }

    return city ? city : null;
}

// Function to handle chatbot response
async function chatbotResponse(question) {
    let response = "";

    // Check if the query is about weather
    const city = detectWeatherQuery(question);
    if (city && typeof city === "string") {
        if (city === "Please specify a city for weather information.") {
            response = city;
        } else {
            const weatherData = await fetchWeather(city);
            if (weatherData && weatherData.main) {
                response = `The weather in ${city} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C.`;
            } else {
                response = "Sorry, I couldn't fetch the weather data for that city.";
            }
        }
    } else {
        // Call Gemini API for non-weather queries
        response = await callGeminiApi(question);
    }

    // Display the chatbot response
    document.getElementById("chat-output").innerHTML += `<p>${response}</p>`;
}

// Function to populate the table with weather data
function populateTable(data, page = 1) {
    const rowsPerPage = 10;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const tableBody = document.querySelector("#weather-table tbody");
    tableBody.innerHTML = ""; // Clear previous table content

    data.slice(startIndex, endIndex).forEach(entry => {
        const row = `
            <tr>
                <td>${entry.dt_txt}</td>
                <td>${entry.main.temp} °C</td>
                <td>${entry.weather[0].description}</td>
                <td>${entry.main.humidity} %</td>
                <td>${entry.wind.speed} m/s</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Pagination buttons
let currentPage = 1;
document.getElementById("next-page-btn").addEventListener("click", () => {
    if (currentPage * 10 < weatherData.length) {
        currentPage++;
        populateTable(weatherData, currentPage);
    }
});

document.getElementById("prev-page-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        populateTable(weatherData, currentPage);
    }
});

// Chatbot event listener
document.getElementById("send-chat-btn").addEventListener("click", () => {
    const userInput = document.getElementById("chat-input-field").value;
    chatbotResponse(userInput);
    document.getElementById("chat-input-field").value = ""; // Clear input field
});
*/

/*
// OpenWeather API details
const openWeatherApiKey = '927c526507a62ff44657b277e2d5b5fe'; // Your OpenWeather API Key

// Gemini API details
const geminiApiKey = 'AIzaSyCN14tIdv8pGscf4G5JrBM9KjCOHugWxmo';
const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCN14tIdv8pGscf4G5JrBM9KjCOHugWxmo`;

// Function to detect if the question is weather-related and extract city name
function detectWeatherQuery(question) {
    const queryLower = question.toLowerCase();
    if (queryLower.includes("weather") || queryLower.includes("forecast") || queryLower.includes("temperature")) {
        return extractCity(question) || "Please specify a city for weather information.";
    }
    return null;
}

// Helper function to extract city from query
function extractCity(question) {
    const prepositions = ["in", "at", "for", "like"];
    for (const prep of prepositions) {
        const index = question.toLowerCase().indexOf(prep);
        if (index !== -1) {
            return question.slice(index + prep.length).trim().split(" ")[0];
        }
    }
    return null;
}

// Function to handle weather queries


async function handleWeatherQuery(city) {
    try {
        const data = await fetchWeather(city);
        if (data && data.main) {
            weatherData = [data]; // Save data to weatherData array for pagination if needed
            return `The weather in ${city} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
        } else {
            return "Sorry, I couldn't fetch the weather data for that city.";
        }
    } catch (error) {
        console.error("Weather query error:", error);
        return "There was an error fetching the weather information.";
    }
}


// Function to fetch weather data from OpenWeather API
async function fetchWeather(city, unit = "metric") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=${unit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to handle Gemini queries
async function handleGeminiQuery(query) {
    try {
        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: { text: query }
            }),
        });

        const data = await response.json();
        console.log("Gemini API Response:", data);

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].output || "No output found in candidates.";
        } else {
            console.error("No candidates found in the response:", data);
            return "Sorry, no valid candidates were returned by the Gemini API.";
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return `Sorry, there was an issue: ${error.message}`;
    }
}

// Main function for handling user input related to weather queries
async function processWeatherInput(question) {
    const city = detectWeatherQuery(question);
    if (city && typeof city === "string") {
        const response = await handleWeatherQuery(city);
        displayResponse(response);
    } else {
        displayResponse("Please specify a valid city.");
    }
}

// Main function for handling user input related to Gemini queries
async function processGeminiInput(question) {
    const response = await handleGeminiQuery(question);
    displayResponse(response);
}

// Function to display the response on the page
function displayResponse(response) {
    document.getElementById("chat-output").innerHTML += `<p>${response}</p>`;
}

// Event listener for send button to determine the type of query and call the appropriate function
document.getElementById("send-chat-btn").addEventListener("click", () => {
    const userInput = document.getElementById("chat-input-field").value.trim();

    // Determine whether it's a weather-related query or not
    if (detectWeatherQuery(userInput)) {
        processWeatherInput(userInput); // Call weather handler
    } else {
        processGeminiInput(userInput); // Call Gemini handler
    }

    // Clear input field after processing
    document.getElementById("chat-input-field").value = "";
});

*/
/*
// OpenWeather API details
const openWeatherApiKey = '927c526507a62ff44657b277e2d5b5fe';

// Gemini API details with your provided key
const geminiApiKey = 'AIzaSyBDuMNbwHjdRBCq7PwVs-Zr0BU7Kwbmhuw';
const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

// Function to detect if a query is related to weather and extract the city
function detectWeatherQuery(question) {
    const queryLower = question.toLowerCase();
    if (queryLower.includes("weather") || queryLower.includes("forecast") || queryLower.includes("temperature")) {
        return extractCity(question) || "Please specify a city for weather information.";
    }
    return null;
}

// Helper function to extract the city from the user's query
function extractCity(question) {
    const prepositions = ["in", "at", "for", "like"];
    for (const prep of prepositions) {
        const index = question.toLowerCase().indexOf(prep);
        if (index !== -1) {
            return question.slice(index + prep.length).trim().split(" ")[0];
        }
    }
    return null;
}

// Function to handle weather queries
async function handleWeatherQuery(city) {
    try {
        const data = await fetchWeather(city);
        if (data && data.main) {
            return `The weather in ${city} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
        } else {
            return "Sorry, I couldn't fetch the weather data for that city.";
        }
    } catch (error) {
        console.error("Weather query error:", error);
        return "There was an error fetching the weather information.";
    }
}

// Function to fetch weather data from OpenWeather API
async function fetchWeather(city, unit = "metric") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=${unit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to handle queries using Gemini API
async function handleGeminiQuery(query) {
    const chatOutput = document.getElementById("chat-output");

    try {
        // Display "Bot is typing..." to inform the user
        chatOutput.innerHTML += `<div><em>Bot is typing...</em></div>`;

        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: { text: query }
            }),
        });

        const data = await response.json();
        console.log("Gemini API Response:", data); // Debugging

        // Check for valid candidates in the response
        if (data.candidates && data.candidates.length > 0) {
            const chatResponse = data.candidates[0].output || "No output found.";
            displayResponse(`Bot: ${chatResponse}`);
        } else {
            throw new Error('Received no valid response from Gemini.');
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        displayResponse(`Bot: ${error.message}`);
    } finally {
        // Remove "Bot is typing..." message
        chatOutput.innerHTML = chatOutput.innerHTML.replace('<div><em>Bot is typing...</em></div>', '');
        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the latest message
    }
}

// Main function to handle user input related to weather queries
async function processWeatherInput(question) {
    const city = detectWeatherQuery(question);
    if (city && typeof city === "string") {
        const response = await handleWeatherQuery(city);
        displayResponse(response);
    } else {
        displayResponse("Please specify a valid city.");
    }
}

// Main function to handle user input related to Gemini queries
async function processGeminiInput(question) {
    const response = await handleGeminiQuery(question);
    displayResponse(response);
}

// Function to display responses in the chat output
function displayResponse(response) {
    document.getElementById("chat-output").innerHTML += `<p>${response}</p>`;
}

// Event listener for the send button to determine the type of query and call the appropriate function
document.getElementById("send-chat-btn").addEventListener("click", () => {
    const userInput = document.getElementById("chat-input-field").value.trim();

    // Determine if the input is weather-related or not
    if (detectWeatherQuery(userInput)) {
        processWeatherInput(userInput); // Handle weather input
    } else {
        processGeminiInput(userInput); // Handle Gemini input
    }

    // Clear input field after processing
    document.getElementById("chat-input-field").value = "";
});
*/



// OpenWeather API details
const weatherapi = '927c526507a62ff44657b277e2d5b5fe';

// Gemini API details with your provided key

const geminiApiKey = 'AIzaSyACp_vxk5rcZzHmkbokySSB7gdmqKxNpPg';


const geminiapi = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyACp_vxk5rcZzHmkbokySSB7gdmqKxNpPg`;

let weatherinformation= [];

let page = 1;

const rowpage = 10;




function detectWeatherQuery(question)
 {

    const querycheck = question.toLowerCase();

    if (querycheck.includes("weather") || querycheck.includes("forecast") || querycheck.includes("temperature"))
    {


        return extractCity(question) || "Please specify a city for weather information.";

    }

    return null;

}

// weather related functgion ednign 


// extracting information 

function extractCity(question) 
{

    const options = ["in", "at", "for", "like"];

    for (const opt of options) 
    {

        const check = question.toLowerCase().indexOf(opt);

        if (check !== -1) {

            return question.slice(check + opt.length).trim().split(" ")[0];

        }

    }

    return null;

}

// Function to handle weather queries

async function handleWeatherQuery(city)
 {

    try
     {
    
        const info = await fetchWeather(city);
    
        if (info && info.main) 
        {
    
            return `The weather in ${city} is ${info.weather[0].description} with a temperature of ${info.main.temp}°C.`;
    
        }
         else
        {
            return "Sorry, I couldn't fetch the weather data for that city.";
        }
    } 
    catch (error) 
    {
        console.error("Weather query error:", error);
        
        return "There was an error fetching the weather information.";
    }
}

// Function to fetch weather data from OpenWeather API


async function fetchWeather(city, unit = "metric") 
{

    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherapi}&units=${unit}`;

    try 
    {

        const reply = await fetch(link);

        if (!reply.ok) 
        {

            throw new Error(`Weather API error: ${reply.statusText}`);

        }

        return await reply.json();

    } 
    catch (error)
     {

        console.error('Error fetching weather data:', error);

        return null;
    }
}

// fetch weather for the table ending yippe 


// gemini api ko handle karne wala function 
/*
async function handleGeminiQuery(query)
 {
    const chatOutput = document.getElementById("chat-output");

    try {
        // Display "Bot is typing..." to inform the user
        chatOutput.innerHTML += `<div><em>Bot is typing...</em></div>`;

        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: query
                    }]
                }]
            }),
        });

        const data = await response.json();
        console.log("Gemini API Response:", data); // Debugging

        // Remove "Bot is typing..." message
        chatOutput.innerHTML = chatOutput.innerHTML.replace('<div><em>Bot is typing...</em></div>', '');

        // Check for valid candidates in the response
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            const chatResponse = data.candidates[0].content.parts[0].text || "No valid response generated.";
            displayResponse(`Bot: ${chatResponse}`);
        } else {
            throw new Error('Received no valid response from Gemini.');
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        displayResponse(`Bot: ${error.message}`);
    } finally {
        chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the latest message
    }
}
*/


async function handleGeminiQuery(query)
 {

    const output = document.getElementById("chat-output");


    try
     {
       
    
        output.innerHTML += `<div><em>Bot is looking for the answer...</em></div>`;


        
        const reply = await fetch(geminiapi, 
            {
        
            method: 'POST',
        
            headers: {
        
                'Content-Type': 'application/json',
        
            },
        
            body: JSON.stringify({
        
                contents: [{
        
                    parts: [{
        
                        text: query
        
                    }]
        
                }]
            }),
        
        });

        
        const information = await reply.json();
        
        console.log("Gemini API Response:", information); 


        
      
        
        output.innerHTML = output.innerHTML.replace('<div><em>Bot is looking for the answer...</em></div>', '');


        
       
        
        if (information.candidates && information.candidates.length > 0 && information.candidates[0].content)
        {
        
            const answer = information.candidates[0].content.parts[0].text || "No valid response generated.";
        
            displayResponse(`Bot: ${answer}`);
        
        }
         else
        {
            throw new Error('Received no valid response from Gemini.');
        }

    } 
    catch (err) 
    {
    
        console.error('Error calling Gemini API:', err);
    
        displayResponse(`Bot: ${err.message}`);
    
    }
   
    finally
    {
        output.scrollTop = output.scrollHeight; 
    }
}

// gemini function api wala ending 


// weather ke liye input wala function 


async function processWeatherInput(question) 
{

    const city = detectWeatherQuery(question);

    if (city && typeof city === "string")
   {

        const reply = await handleWeatherQuery(city);

        displayResponse(reply);

    } 
    else
    {

        displayResponse("Please specify a valid city.");

    }

}


// weather ke liye input wala function khatam ahhhh



// input for the gemini functuon ahhh 

async function processGeminiInput(question)
 {

    const reply = await handleGeminiQuery(question);

    displayResponse(reply);
}

// gemini wala input function ending 



// display katwane wala function

function displayResponse(response)
{

    document.getElementById("chat-output").innerHTML += `<p>${response}</p>`;

}

// dispalying function ending ahh 


// button se sawla recoginixe karna 

document.getElementById("send-chat-btn").addEventListener("click", () => 
{
    
    const input = document.getElementById("chat-input-field").value.trim();




    if (detectWeatherQuery(input))
    {

        processWeatherInput(input); 

    }
     else 
    {

        processGeminiInput(input); 
    }

    

    document.getElementById("chat-input-field").value = "";
});


// pagination shit 

// pagination 

async function fetchingWeatherForPage(city, unit = "metric")
 {

    const link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherapi}&units=${unit}`;


    
    try 
    {
    
        const reply = await fetch(link);
    
        if (!reply.ok)
       {
    
            throw new Error(`Weather API error: ${response.statusText}`);
    
        }

        const information = await reply.json();
    
        return information.list; 
    
    }
     catch (error) 
    {
    
        console.error('Error fetching weather data:', error);
    
        return [];
    
    }
}

// fetching weather function for the pagination eding 

// page table dfunction 

function renderTable(page)
 {

    const tables = document.querySelector("#weather-table tbody");

    tables.innerHTML = ""; 

   
    const start = (page - 1) * rowpage;
   
    const end = Math.min(start + rowpage, weatherinformation.length);

   
    weatherinformation.slice(start, end).forEach(entry =>
     {
   
        const row = `
            <tr>
                <td>${entry.dt_txt}</td>
   
                <td>${entry.main.temp} °C</td>
   
                <td>${entry.weather[0].description}</td>
   
                <td>${entry.main.humidity} %</td>
   
                <td>${entry.wind.speed} m/s</td>
   
                </tr>
        `;
        tables.innerHTML += row;
    });

    updatePaginationButtons();
}

// information adding on the apge is ending 



// update  buttons

function updatePaginationButtons()
 {
    const max = Math.ceil(weatherinformation.length / rowpage);

    document.getElementById("prev-page-btn").disabled = page === 1;

    document.getElementById("next-page-btn").disabled = page === max;

}

// update function ending 


// re-render the table

function changePage(increment) 
{

    const max= Math.ceil(weatherinformation.length / rowpage);

    page = Math.min(Math.max(page + increment, 1), max);

    renderTable(page); 

}

// changing function eding 


// to listen to the weather 

document.getElementById("get-weather-btn").addEventListener("click", async () => 
{
    
    const city = document.getElementById("city-input").value.trim();
    
    const unit = document.getElementById("unit-selector").value;

    if (city) 
    {
       
        weatherinformation = await fetchingWeatherForPage(city, unit); 
       
        if (weatherinformation.length > 0) 
        {
       
            page = 1;
       
            renderTable(page); 
        }
         else
        {

            alert('No weather data found for the entered city.');

        }

    }

});



document.getElementById("next-page-btn").addEventListener("click", () => changePage(1));

document.getElementById("prev-page-btn").addEventListener("click", () => changePage(-1));