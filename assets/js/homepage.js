var userFormEl = document.querySelector('#user-form');

var cityInputEl = document.querySelector('#cityName');
var searchHistoryEl = document.querySelector("#searchHistory");

var todayWeatherEl = document.querySelector('#todayWeatherDisplay');

var fiveDayWeatherDisplayEl = document.querySelector('#fiveDaysWeatherDisplay');
var fiveDaySectionEl = document.querySelector('#fiveDaysSection');


var searchedCityCnt = 0;
var initializedCityCnt = 0;
var searchedCityArray = [];
var initializationProcedure = true;

var formSubmitHandler = function (event) 
{
  event.preventDefault();

  console.log("formSubmitHandler");

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getWeatherApi(cityName);

    todayWeatherEl.innerHTML = '';
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

function createSearchedCityBtn(data)
{
  var devEl = document.createElement("div");
  devEl.setAttribute('style', 'margin: 10pt;');
  var cityHistoryButtonEl = document.createElement('button');
  cityHistoryButtonEl.classList = 'history-btn';
  cityHistoryButtonEl.innerText = data.city.name;

  cityHistoryButtonEl.addEventListener("click", function(event) {

    displayCityWeather(data);

  });

  devEl.appendChild(cityHistoryButtonEl);
  searchHistoryEl.appendChild(devEl);

}


function displayCityWeather(data)
{

  todayWeatherEl.innerHTML = '';

  var todayEl = document.createElement('div');
  todayEl.classList = 'todayCard mb-3';
  displayCityWeatherByDate(todayEl, data, 0);      // today
  todayWeatherEl.appendChild(todayEl);

  fiveDaySectionEl.innerHTML = '';

  var day1DisplayEl = document.createElement('fivedayCard');
  day1DisplayEl.classList = 'fivedayCard';
  displayCityWeatherByDate(day1DisplayEl, data, 7);       // tomorrow, today + 1day
  fiveDaySectionEl.appendChild(day1DisplayEl);

  var day2DisplayEl = document.createElement('fivedayCard');
  day2DisplayEl.classList = 'fivedayCard';
  displayCityWeatherByDate(day2DisplayEl, data, 15);      // today + 2day
  fiveDaySectionEl.appendChild(day2DisplayEl);

  var day3DisplayEl = document.createElement('fivedayCard');
  day3DisplayEl.classList = 'fivedayCard';
  displayCityWeatherByDate(day3DisplayEl, data, 23);      // today + 3day
  fiveDaySectionEl.appendChild(day3DisplayEl);

  var day4DisplayEl = document.createElement('fivedayCard');
  day4DisplayEl.classList = 'fivedayCard';
  displayCityWeatherByDate(day4DisplayEl, data, 31);      // today + 4day
  fiveDaySectionEl.appendChild(day4DisplayEl);

  var day5DisplayEl = document.createElement('fivedayCard');
  day5DisplayEl.classList = 'fivedayCard';
  displayCityWeatherByDate(day5DisplayEl, data, 39);      // today + 5day
  fiveDaySectionEl.appendChild(day5DisplayEl);


  if (initializationProcedure === true )      // alway add search history button during initialization
  {
    createSearchedCityBtn(data);

    initializedCityCnt++;

    console.log("initializedCityCnt = " + initializedCityCnt);        

    if (initializedCityCnt == searchedCityCnt)
    {
      initializationProcedure = false;

      console.log("initializationProcedure = false 2");        
    }
  }
  else 
  {
    if (searchedCityArray.includes(data.city.name))
    {
      console.log("searchedCityArray.match: " + data.city.name);      // do not create duplicate search history button, do not add to the database
    }
    else
    {
      createSearchedCityBtn(data);                                    

      searchedCityArray[searchedCityCnt] = data.city.name;
      searchedCityCnt++;
  
      localStorage.setItem("searchedCityCnt", searchedCityCnt);
      localStorage.setItem("searchedCityArray", JSON.stringify(searchedCityArray));  
    }
  } 

}



function displayCityWeatherByDate(displayEl, data, arrayNum)
{

  console.log("data = ", data);

  if (data.length === 0) {
    todayWeatherEl.textContent = 'No repositories found.';
    return;
  }

  displayEl.innerHTML = "";

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

function retrieveStoreData()
{
  var citycntval = localStorage.getItem("searchedCityCnt");
  console.log("citycntval: ", citycntval);

  if (citycntval != null)
  {
    console.log("searchedCityCnt: ", searchedCityCnt);
    console.log("searchedCityArray = ", searchedCityArray);  

    if (citycntval != 0)
    {
      searchedCityCnt = JSON.parse(localStorage.getItem("searchedCityCnt"));
      searchedCityArray = JSON.parse(localStorage.getItem("searchedCityArray"));

      console.log("searchedCityCnt: ", searchedCityCnt);
      console.log("searchedCityArray = ", searchedCityArray);

      for (var i=0; i<searchedCityCnt ; i++)
      {
        getWeatherApi(searchedCityArray[i]);
      }
    }
    else
    {
      initializationProcedure = false;    

      console.log("initializationProcedure = false 1");

      return;
    }
  }


}



retrieveStoreData();

userFormEl.addEventListener('submit', formSubmitHandler);

