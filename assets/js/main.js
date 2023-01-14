// globals
const apiKey = '4f2db4d9e71e8d3d6ecabed5a59fb6e5';


// ~ the liveVariables don't need to exist, I think.
// let liveTemperature = $('#live-temperature');
// let liveWindSpeed = $('#live-windSpeed');
// let liveHumidity = $('#live-humidity');
// let liveCity = $('live-city');
let incomingHistory = localStorage.getItem("cityHistory");
let incomingCityHihstory = [];
let userCitySearch = $('#userCityRequest');
let btnSearch = $('#searchButton');
let btnCity = $('#cityButton');
let citySearch = "";
let todayDate = "";





// pulls from local storage & checks to see if it's empty
function getCityHistory (){
  try{
    incomingCityHsitory = JSON.parse(incomingCityHistory)
  } catch(e){
    schedule = [];
  };
  console.log(incomingCityHihstory);

  // do the next thing
}





// gets the weather data from the API


function getWeatherData(){  
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`
  // console.log(apiURL);

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // *console.log(data)
  
    // TODO logging out the variables to confirm their existence/layout
      // *console.log(data.name);
      // *console.log(data.main.temp);
      // *console.log(data.wind.speed);


      // $('#live-temperature');
// $('#live-windSpeed');
// $('#live-humidity');
// $('live-city');
    liveTemperature = $(data.temp);
    
    });
}




function searchButtonListen(){
  
  

  btnSearch.on('click', function(event){
    event.preventDefault();
    citySearch = $('#userCityRequest').val();
    // console.log(citySearch);
    // console.log('you clicked search!') ;
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
