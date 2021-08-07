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

function dateConverter(unixTimeStamp) {
  const dateObject = new Date(unixTimeStamp * 1000);
  const month = dateObject.toLocaleString("en-US", {month: "numeric"})
  const day = dateObject.toLocaleString("en-US", {day: "numeric"})
  const year = dateObject.toLocaleString("en-US", {year: "numeric"})
  const formattedDate = `${month}/${day}/${year}`
  return formattedDate;
}

function populateWeatherData(data) {
  var cityName = data.city.name;
  var currentDate = dateConverter(data.list[0].dt);
  var currentTemp = data.list[0].main.temp;
  var currentWind = data.list[0].wind.speed;
  var currentHum = data.list[0].main.humidity;
  var currentDesc = data.list[0].weather[0].description;
  var currentIcon = data.list[0].weather[0].icon;
  $('.city-name').text(cityName);
  $('.current-date').text(currentDate);
  $('.current-icon').html(`<img src="https://openweathermap.org/img/wn/${currentIcon}.png">`)
  $('.current-temp').text(currentTemp);
  $('.current-wind').text(currentWind);
  $('.current-humidity').text(currentHum);
  $('.current-description').text(currentDesc);

  var forecastDisplay = "";
  for (var i = 0; i < 5; i++) {
    var forecastDate = dateConverter(data.list[i].dt);
    var forecastTemp = data.list[i].main.temp;
    var forecastWind = data.list[i].wind.speed;
    var forecastHum = data.list[i].main.humidity;
    var forecastIcon = data.list[i].weather[0].icon;

    var forecastCard = `
    <div class="column is-one-fifth">
      <div class="box notification is-primary">
      <p class="subtitle">${forecastDate}</p>
      <img src="https://openweathermap.org/img/wn/${forecastIcon}.png">
      <p>Temp: ${forecastTemp}° F</p>
      <p>Wind: ${forecastWind}</p>
      <p>Humidity: ${forecastHum}</p>
      </div>
    </div>`;
    forecastDisplay = forecastDisplay + forecastCard;
  }
  $("#forecast-display").html(forecastDisplay);
}

function searchHistory(searchItem) {
    searchItem = searchItem.toLowerCase();
    var history = localStorage.getItem("searchHistory")
        //Check if there's existing history
    if (history === null) {
        //If there's no exisiting history, make a new blank entry
        localStorage.setItem("searchHistory", "")
    }
    if (!history.includes(searchItem)) {
        history = "<option>" + searchItem + "</option>" + history;
    }
    //Save it to local storage
    localStorage.setItem("searchHistory", history)
        //pull newly updated version from local storage
    var historyList = localStorage.getItem("searchHistory")
        //Clear out whatever's there in history to begin with
    $("#search-history").empty();
    //Add the new search history list
    $("#search-history").append(historyList)
    console.log(historyList);
}

document.getElementById("search-button").addEventListener("click", function() {
  var city =  $('#search-value').val();
  searchHistory(city);
  getWeather(city);
} )
