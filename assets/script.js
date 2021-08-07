function getWeather(city) {

  var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=ec8111779186bc038867060a7d9bd517`
  fetch(urlForecast)
  .then(response => response.json())
  .then(data => {
   console.log(data);
   populateWeatherData(data);
  })
  .catch((error) => {
    console.log("Error");
    alert("Sorry, we can't find that city.")
  })
}

function populateWeatherData(data) {
  var currentTemp = data.list[0].main.temp;
  var currentWind = data.list[0].wind.speed;
  var currentHum = data.list[0].main.humidity;
  var currentDesc = data.list[0].weather[0],description;

  console.log(`Temp ${currentTemp}, Wind ${currentWind}, Hum ${currentHum}, Desc ${currentDesc}`);
}


document.getElementById("search-button").addEventListener("click", function() {
  var city =  $('#search-value').val();
  getWeather(city);
} )
