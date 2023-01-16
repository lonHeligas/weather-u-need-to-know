// globals
const apiKey = '4f2db4d9e71e8d3d6ecabed5a59fb6e5';


// ~ the liveVariables don't need to exist, I think.
let liveCityEl = $('#live-city');
let iconEl = $('#icon');
let liveTempEl = $('#live-temperature');
let liveWindSpeedEl = $('#live-windSpeed');
let liveHumidityEl = $('#live-humidity');

let futureIconEl = $('future-icon');
let futureTempEl = $('future-temperature');
let futureWindSpeedEl = $('future-windSpeed');
let futureHumidityEl = $('#future-humidity');
let dayCardEl = $('day-card');

//let incomingCityHistory = [];
let userCitySearch = $('#userCityRequest');
let btnSearch = $('#searchButton');
let btnCity = $('#city-button');
let btnContainerEl = $('#button-container')
let citySearch;
let cardArray = [];
let importHistory ="";
let searchHistory =[];
let dateRaw = moment();






// * pulls from local storage & checks to see if it's empty
importHistory = localStorage.getItem("cityHistory");
if(importHistory == null){
  searchHistory = [];
} else {
  searchHistory = JSON.parse(importHistory);
}
console.warn("this is the browser history", searchHistory);


// console.log("this is the searchHistory", searchHistory);

  


  



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
    liveCityEl.text(`${liveCity}  (${dateRaw.format('M/Do/YYYY')})     `);         
    iconEl.attr('src', liveIconURL).height("50px").width("50px");          
    liveTempEl.text(`Temp: ${liveTemp} °F`);
    liveWindSpeedEl.text(`Wind: ${liveWind} MPH`);
    liveHumidityEl.text(`Humidity: ${liveHumid}%`);
  })
}

function receiveFuturePayload(response){
  response.json().then(function (data) {
    // the date we're looking at during the reduce
    let futureDay = ''

    const dailyData = data.list.reduce(function(result, value){

      // *console.log('reduce is looking at ', value)
      // *console.log('its day is ', moment(value.dt_txt).format('M/Do/YYYY'))
      const dataDate = moment(value.dt_txt).format('M/Do/YYYY')
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

    // if (cardArray.length < 5){
    //   while()
    // }

    
    

    // if less than 5 .day-cards, clone the first until theres 5
    // while($('.day-card).length < 5){
    //  $('.day-cards').append($('.day-card').first().clone())
    //}

    //loop from 0 to 4 on the daily data and populate each div
    // for(var i = 0; i<4 i++){
      // populate each field for each data
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

  // $('#live-temperature');
  // $('#live-windSpeed');
  // $('#live-humidity');
  // $('live-city');

  // console.log(liveTempEl);
}


function addCityButton() {
  btnCity = $('<button class="row" id="cityButton"></button>').text(citySearch);
  btnContainerEl.append(btnCity);  
  btnCity.on("click", cityButtonListen);
  
}

// TODO get the 5 day forecast and build out the day cards

// TODO save the city as a button and put it on the left side
//    TODO save the city data as localstorage information 



function searchButtonListen(){ 
  btnSearch.on('click', function(event){
    event.preventDefault();
    citySearch = $('#userCityRequest').val();
    
    // console.log(citySearch);
    // console.log('you clicked search!') ;
    
    // TODO store the city name and build the button
    
    // gets the API data for the requested city
    getWeatherData(citySearch);
    
    // console.log("CitySearch length", citySearch.length);
    // console.log("Search history length:", searchHistory.length)
    
    // searches the search history array for duplicates
    if (searchHistory.includes(citySearch)){
      console.log ("no");
      
      // make function that flashes the button that already exists
      // and tells the user that the city's already been searched

    } else {

      console.log(searchHistory);
      // console.warn("this is the current search history ",searchHistory);
      searchHistory.push(citySearch);
      // console.error("this is now the current search history ",searchHistory);
      // console.log ("yes"); 
      // TODO addCityButton();
      
      
      // console.log(searchHistory);
      addCityButton();
      localStorage.setItem("cityHistory", JSON.stringify(searchHistory));
      // console.log("helllo?", searchHistory.length);
    }
    
  })
}


function cityButtonListen(){
  // btnCity.on('click', function(event){
    citySearch = $(this).text()
    console.log(citySearch);  
    console.log('you clicked a city button!') ;
    getWeatherData();
//   })
}


searchButtonListen();
