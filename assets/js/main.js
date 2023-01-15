// globals
const apiKey = '4f2db4d9e71e8d3d6ecabed5a59fb6e5';


// ~ the liveVariables don't need to exist, I think.
let liveCityEl = $('#live-city');
let iconEl = $('#icon');
let liveTempEl = $('#live-temperature');
let liveWindSpeedEl = $('#live-windSpeed');
let liveHumidityEl = $('live-humidity');

let futureIconEl = $('future-icon');
let futureTempEl = $('future-temperature');
let futureWindSpeedEl = $('future-windSpeed');
let futureHumidityEl = $('#uture-humidity');

let incomingHistory = localStorage.getItem("cityHistory");
let incomingCityHihstory = [];
let userCitySearch = $('#userCityRequest');
let btnSearch = $('#searchButton');
let btnCity = $('#cityButton');
let citySearch = "";

let dateRaw = moment();







// * pulls from local storage & checks to see if it's empty
function getCityHistory (){
  try{
    incomingCityHsitory = JSON.parse(incomingCityHistory)
  } catch(e){
    schedule = [];
  };
  console.log(incomingCityHihstory);

  // do the next thing
}


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
    liveCityEl.text(`${liveCity}  (${dateRaw.format('M/Do/YYYY')})`);         
    iconEl.attr('src', liveIconURL);          
    liveTempEl.text(`Temp: ${liveTemp} °F`);
    liveWindSpeedEl.text(`Wind: ${liveWind} MPH`);
    liveHumidityEl.text(`Humidity: ${liveHumid}%`);
  })
}

function receiveFuturePayload(response){
  response.json().then(function (data) {
    console.log(data)
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

// TODO get the 5 day forecast and build out the day cards

// TODO save the city as a button and put it on the left side
//    TODO save the city data as localstorage information 



function searchButtonListen(){ 
  

  btnSearch.on('click', function(event){
    event.preventDefault();
    citySearch = $('#userCityRequest').val();
    // *console.log(citySearch);
    // *console.log('you clicked search!') ;
    // TODO store the city name and build the button
    getWeatherData()


  })
}

function cityButtonListen(){
  btnCity.on('click', function(event){
  
    console.log('you clicked a city button!') ;
  })
}


cityButtonListen();
searchButtonListen();
