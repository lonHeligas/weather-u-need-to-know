
const apiKey = '4f2db4d9e71e8d3d6ecabed5a59fb6e5';




// gets the weather data from the API
function getWeatherData(){  
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial";

  fetch(requestUrl)
    .then(function (response){
      return response.json();
    })
    .then(function(data){
      console.log(data)

    });
}





getWeatherData()