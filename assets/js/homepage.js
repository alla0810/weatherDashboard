var userFormEl = document.querySelector('#user-form');

var cityInputEl = document.querySelector('#cityName');
var todayWeatherEl = document.querySelector('#todayWeatherDisplay');

var fiveDayWeatherDisplayEl = document.querySelector('#fiveDaysWeatherDisplay');
var day1DisplayEl = document.querySelector('#day1Display');
var day2DisplayEl = document.querySelector('#day2Display');
var day3DisplayEl = document.querySelector('#day3Display');
var day4DisplayEl = document.querySelector('#day4Display');
var day5DisplayEl = document.querySelector('#day5Display');


var formSubmitHandler = function (event) 
{
  event.preventDefault();

  console.log("formSubmitHandler");

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getWeatherApi(cityName);

    todayWeatherEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City Name');
  }
};



var getWeatherApi = function (city) {
  var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + '620ba2c5b15aa7579103facd95c400ac' + '&units=imperial';

  console.log(weatherApiUrl);

  fetch(weatherApiUrl)
    .then(function (response) 
    {
      if (response.ok) {
        response.json().then(function (data) {
          displayCityWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};


function displayCityWeather(data)
{
  displayCityWeatherByDate(todayWeatherEl, data, 0);
  displayCityWeatherByDate(day1DisplayEl, data, 7);
  displayCityWeatherByDate(day2DisplayEl, data, 15);
  displayCityWeatherByDate(day3DisplayEl, data, 23);
  displayCityWeatherByDate(day4DisplayEl, data, 31);
  displayCityWeatherByDate(day5DisplayEl, data, 39);      
}


function displayCityWeatherByDate(displayEl, data, arrayNum)
{

  console.log("data = ", data);

  if (data.length === 0) {
    todayWeatherEl.textContent = 'No repositories found.';
    return;
  }

  if (arrayNum === 0)
  {
    var dateEl = document.createElement('h3');
    var cityName = data.city.name;
  }
  else
  {
    var dateEl = document.createElement('h4');
  }

  var cityDate = data.list[arrayNum].dt_txt.trim();
  console.log(cityDate);

  var cityDateArray = cityDate.split(" ");
  var cityDateWOTime = cityDateArray[0];
  var cityDateDisplay = dayjs(cityDateWOTime).format('M/DD/YYYY');

  if (arrayNum === 0)
  {
    dateEl.textContent = cityName + " (" + cityDateDisplay + ") ";
  }
  else
  {
    dateEl.textContent = cityDateDisplay;
  }

  var weather = data.list[arrayNum].weather[0].main;

  console.log("weather:", weather);

  if (arrayNum != 0)
  {
    dateEl.innerHTML += "<br>";
  }

  if (weather === "Clear")
  {
    dateEl.innerHTML += "<i class='fas fa-solid fa-sun' style='color: #c10101;'></i>";
  }
  else if (weather == "Cloud_sun")
  {
    dateEl.innerHTML += "<i class='fas fa-duotone fa-cloud-sun' style='color: #2E8BC0'></i>";
  }
  else if (weather === "Clouds")
  {
    dateEl.innerHTML += "<i class='fas fa-solid fa-cloud' style='color: #2E8BC0;'></i>";
  }
  else if (weather === "Rain")
  {
    dateEl.innerHTML += "<i class='fas fa-duotone fa-cloud-rain' style='color: #2E8BC0;'></i>";
  }
  else if (weather ==="Snow")
  {
    dateEl.innerHTML += "<i class='fas fa-regular fa-snowflake' style='color: #2E8BC0;'></i>";
  }
  else
  {
    dateEl.innerHTML += weather;
  }

  displayEl.appendChild(dateEl);

var tempEl = document.createElement('h6');
var temp = data.list[arrayNum].main.temp;
tempEl.textContent = "Temp: " + temp.toString();
tempEl.innerHTML += "&deg;";
tempEl.innerHTML += "F";
displayEl.appendChild(tempEl);

var windEl = document.createElement('h6');
var wind = data.list[arrayNum].wind.speed;
windEl.textContent = "Wind: " + wind.toString() + " MPH";
displayEl.appendChild(windEl);

var humidityEl = document.createElement('h6');
var humidity = data.list[arrayNum].main.humidity;
humidityEl.textContent = "Humidity: " + humidity.toString() + " %";
displayEl.appendChild(humidityEl);


}



var displayTodayWeather = function (data, city) {

  console.log("data = ", data);

  if (data.length === 0) {
    todayWeatherEl.textContent = 'No repositories found.';
    return;
  }

  var todayCityWeatherEl = document.createElement('h3');
  var cityName = data.city.name;
  var cityDate = data.list[0].dt_txt.trim();
  
  console.log(cityDate);

  var cityDateArray = cityDate.split(" ");
  var cityTodayDate = cityDateArray[0];
  var cityTodayDateDisplay = dayjs(cityTodayDate).format('M/DD/YYYY');

  todayCityWeatherEl.textContent = cityName + " (" + cityTodayDateDisplay + ") ";

  var weather = data.list[0].weather[0].main;

  console.log("weather:", weather);

  if (weather === "Clear")
  {
    todayCityWeatherEl.innerHTML += "<i class='fas fa-solid fa-sun' style='color: #c10101;'></i>";
  }
  else if (weather == "Cloud_sun")
  {
    todayCityWeatherEl.innerHTML += "<i class='fas fa-duotone fa-cloud-sun' style='color: #2E8BC0'></i>";
  }
  else if (weather === "Clouds")
  {
    todayCityWeatherEl.innerHTML += "<i class='fas fa-solid fa-cloud' style='color: #2E8BC0;'></i>";
  }
  else if (weather === "Rain")
  {
    todayCityWeatherEl.innerHTML += "<i class='fas fa-duotone fa-cloud-rain' style='color: #2E8BC0;'></i>";
  }
  else if (weather ==="Snow")
  {
    todayCityWeatherEl.innerHTML += "<i class='fas fa-regular fa-snowflake' style='color: #2E8BC0;'></i>";
  }
  else
  {
    todayCityWeatherEl.innerHTML += weather;
  }

  todayWeatherEl.appendChild(todayCityWeatherEl);

var todayTempEl = document.createElement('h6');
var todayTemp = data.list[0].main.temp;
todayTempEl.textContent = "Temp: " + todayTemp.toString();
todayTempEl.innerHTML += "&deg;";
todayTempEl.innerHTML += "F";
todayWeatherEl.appendChild(todayTempEl);

var todayWindEl = document.createElement('h6');
var todayWind = data.list[0].wind.speed;
todayWindEl.textContent = "Wind: " + todayWind.toString() + " MPH";
todayWeatherEl.appendChild(todayWindEl);

var todayHumidityEl = document.createElement('h6');
var todayhumidity = data.list[0].main.humidity;
todayHumidityEl.textContent = "Humidity: " + todayhumidity.toString() + " %";
todayWeatherEl.appendChild(todayHumidityEl);
 

displayFiveDayWeather(data, cityTodayDateDisplay);
};


function displayFiveDayWeather(data, today)
{
  console.log("displayFiveDayWeather");
  console.log(today);  

  /* 1 day after today */
  var arrayNum = 8;
  var day1Date = data.list[8].dt_txt.trim();  

  console.log(day1Date);    

  var day1DateEl = document.createElement('h4');
  day1DateEl.textContent = day1;
  day1DisplayEl.appendChild(day1DateEl);


}



userFormEl.addEventListener('submit', formSubmitHandler);

