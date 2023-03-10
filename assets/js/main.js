// globals
const apiKey = '4f2db4d9e71e8d3d6ecabed5a59fb6e5';
const fiveDayTitle = $('#five-day-title');


// ~ the liveVariables don't need to exist, I think.
let liveCityEl = $('#live-city');
let iconEl = $('#icon');
let liveTempEl = $('#live-temperature');
let liveWindSpeedEl = $('#live-windSpeed');
let liveHumidityEl = $('#live-humidity');


// let futureDateEl = $('future-date');
// let futureIconEl = $('future-icon');
// let futureTempEl = $('future-temperature');
// let futureWindSpeedEl = $('future-windSpeed');
// let futureHumidityEl = $('#future-humidity');
let dayCardEl = $('.day-card');
let dayCardsEl = $('.day-cards')

//let incomingCityHistory = [];
let userCitySearch = $('#userCityRequest');
let btnSearch = $('#searchButton');
let btnCity = $('#city-button');
let btnContainerEl = $('#button-container')
let citySearch;

let importHistory ="";
let searchHistory =[];
let dateRaw = moment();

for (i=0; i<4; i++){
  dayCardsEl.append(dayCardEl.clone());  
}



// * pulls from local storage & checks to see if it's empty
importHistory = localStorage.getItem("cityHistory");
if(importHistory == null){
  searchHistory = [];
} else {
  searchHistory = JSON.parse(importHistory);
  for (i=0; i<searchHistory.length; i++){
    addCityButton(searchHistory[i]);
  }

}
// console.warn("this is the browser history", searchHistory);


// gets the current day's forecast from the API
function receiveCurrPayload (response){
  response.json().then(function (data) {
    // ~console.log(data)
    
  // TODO logging out the variables to confirm their existence/layout
    
    // ~ console.log(data.name);
    // ~ console.log(data.main.temp);
    // ~ console.log(data.wind.speed);

    // ? establishes the variables for the panel

    var liveCity = data.name;
    var liveIconId = data.weather[0].icon;
    var liveTemp = data.main.temp;
    var liveWind = data.wind.speed;
    var liveHumid = data.main.humidity;

    var liveIconURL = `http://openweathermap.org/img/w/${liveIconId}.png`;
    
    
    // ~ console.log(liveCity);
    // ~ console.log(liveTemp);
    // ~ console.log(liveWind);
    // ~ console.log(liveHumid);
    // ~ console.log(liveIconURL);

    // *posts the information to the DOM
    liveCityEl.text(`${liveCity}  (${dateRaw.format('M/D/YYYY')})     `);         
    iconEl.attr('src', liveIconURL).height("50px").width("50px");          
    liveTempEl.text(`Temp: ${liveTemp} ??F`);
    liveWindSpeedEl.text(`Wind: ${liveWind} MPH`);
    liveHumidityEl.text(`Humidity: ${liveHumid}%`);
  })
}


// gets the 5 day forecast information from the API
function receiveFuturePayload(response){
  dayCardsEl.removeClass('hidden');
  fiveDayTitle.removeClass('hidden');
  
  response.json().then(function (data) {
    // the date we're looking at during the reduce
    let futureDay = ''

    const dailyData = data.list.reduce(function(result, value){

      // *console.log('reduce is looking at ', value)
      // *console.log('its day is ', moment(value.dt_txt).format('M/Do/YYYY'))
      const dataDate = moment(value.dt_txt).format('M/D/YYYY')
      if(dataDate != futureDay){
        // adds the item to the array
        result.push(value)
        // update futureDay to tell us to keep going until we hit a new day 
        futureDay = dataDate
      }
      return result
    }, [])

    // logs the reduced array of one item for each day
    console.log('reduced data', dailyData)
    for (n=0; n<5; n++){
      const dayCard = $('.day-card').eq(n)  // shortcut for the element
      const dayData = dailyData[n];         // shortcut for the data array
      const futureIconID = dayData.weather[0].icon;
      const futureIconUrl = `http://openweathermap.org/img/w/${futureIconID}.png`

      // adds the data to the 5 day forecast pages
      dayCard.find('.future-date').text(moment(dayData.dt_txt).format('M/D/YY'));  
      dayCard.find('.future-icon').attr('src', futureIconUrl).height("30px").width("30px")    
      dayCard.find('.future-temperature').text(`${dayData.main.temp} ??F`);
      dayCard.find('.future-windspeed').text(`${dayData.wind.speed} MPH`);
      dayCard.find('.future-humidity').text(`Humidity: ${dayData.main.humidity}`);
      
      // date/icon/temp/windspeed/humidity
    }

    // searches the search history array for duplicates
  if (searchHistory.includes(citySearch)){
    // console.log ("no");    
    // TODO make function that flashes the button that already exists
    // TODO and tells the user that the city's already been searched
    } else {
    
    // console.log(searchHistory);      
    searchHistory.push(citySearch);   
    // console.log ("yes"); 
    // TODO addCityButton();
    addCityButton(data.city.name);
    localStorage.setItem("cityHistory", JSON.stringify(searchHistory));

  }
  console.log(dayCardsEl);
  console.log(dayCardEl);
  
   
    console.log("hello?");
      //}
  })
}

// gets the weather data from the API
function getWeatherData(){  
  var liveApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`;  
  // *console.log(apiURL);

  var forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=imperial`;

  fetch(liveApiURL)
  
  .then(receiveCurrPayload);  
  fetch(forecastApiURL)
  .then(receiveFuturePayload);
     
  }
  // console.log(liveTempEl);

// adds a city button when you search for a city
function addCityButton(city=citySearch) {
  btnCity = $('<button class="col-12 mx-auto row btn btn-primary pl-5" id="cityButton"></button>').text(city)  
  btnContainerEl.append(btnCity);  
  btnCity.on("click", cityButtonListen);
  
}

// TODO get the 5 day forecast and build out the day cards

// TODO save the city as a button and put it on the left side
//    TODO save the city data as localstorage information 


// listens for you to put in a city and search for it
function searchButtonListen(){ 
  btnSearch.on('click', function(event){
    event.preventDefault();
    citySearch = $('#userCityRequest').val();
    
    
    // console.log(citySearch);
    // console.log('you clicked search!') ;
    
    // TODO store the city name and build the button
    
    // gets the API data for the requested city
    getWeatherData(citySearch);


    
    
    
  })
}

// waits for you to click on an already searched city button
function cityButtonListen(){
  // btnCity.on('click', function(event){
    citySearch = $(this).text()
    console.log(citySearch);  
    console.log('you clicked a city button!') ;
    getWeatherData();
//   })
}

searchButtonListen();
