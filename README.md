## weather app api 

## overview 
 
 This is the weather app  which is web-based to update the users about the weather conditions whith several different kinds of charts and filters to see a specific condition regarding the weather . Secondly it includes Openweather API as well as Gemini chatbot to answer both weather related and other questions . 

 # Technology 

 1. html 
 2. css 
 3. Openweather API 
 4. Gemini API 
 5. javascript 
 6. Chart.js

 
## Setup reuqirements

1. Unzip the provided zip file
2. Open Folder into any preferred ide
3. Locate the file named "home.html" and run it in the  live server . 
4. If you specify want to see the chatbot feature located the file name " table.html" and run it in the live server . 



## Running it locally

1. **Start the Visual Studio Code project.**
2. Install the "Live Server" plugin in VS Code if it isn't already installed.
3. To open the project in the web browser of your choice, right-click on "home.html" and choose "Open with Live Server".



## Features 

 a side menu featuring the weather app's logo at the top that offers ways to access the dashboard and tables pages.
 a widget that shows weather information according to the user-selected city.
 The background of the widget dynamically changes based on the weather conditions (e.g., cloudy, sunny, etc.).
 The widget's background automatically adjusts to the current weather (cloudy, sunny, etc.).
 Vertical Bar Chart: Shows the chosen city's temperature over the next five days.
 Doughnut Chart: Displays the percentage of various weather scenarios for the ensuing five days.
 Line Chart:  The temperature variations over the next five days are displayed in a line chart.
 A temperature forecast table with pagination following the first ten rows, showing information for the following five days.
 The data includes temperature, humidity, wind speed, and weather description.
 Integrated the Gemini Chatbot API to handle general questions and weather-related inquiries.
 Weather information is retrieved via the OpenWeather API in response to weather queries.
 Sort temperatures in ascending or descending order. 
 Select the day with the greatest temperature or just display the days that have rain.


 ## Additional Features

Loading Spinner: To enhance user feedback, a loading spinner shows while you wait for the API answer.
Unit Conversion: For temperature display, users can switch between Celsius and Fahrenheit.
Geolocation: Upon page load, automatically retrieves meteorological information for the user's current location.


## Notes

There can be limitations on APIs. When testing, bear in mind that the OpenWeather API calls are limited to 60 per minute under the free plan.
When cities cannot be located, API limitations are reached, or geolocation is unsuccessful, error messages are shown.



## GitHub link 

 Link for the assignment : https://github.com/eshariaz1/webA2

## Deployed Link 

link for the assignment : https://cute-sundae-870c61.netlify.app/



## How to navigate the assignment 

Weather Search: Type a city name into the search bar and press Enter or click the search button to view the weather forecast along with corresponding charts.
Forecast Navigation: Navigate through the paginated forecast table using the "Previous" and "Next" buttons to see more weather data.
Chatbot Interaction: Enter a query in the chat input box to get responses from the chatbot, whether it’s a weather-related or a general question.
Detailed Weather Information: Get an overview of current weather conditions for a city, including temperature, description, humidity, and wind speed, after performing a search.
Responsive Interface: The application adapts to various screen sizes, ensuring a seamless user experience on both mobile and desktop devices.



