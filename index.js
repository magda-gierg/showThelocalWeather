const loc = document.getElementById("location");
const tempNumber = document.getElementById("temperature_number");
const tempScale = document.getElementById("temperature_scale");
const weatherCondition = document.getElementById("weather_condition");
const weatherIcon = document.getElementById("weather_icon");

window.onload = function() {
  getLocation();
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      loc.innerHTML = myJson.name;
      tempNumber.innerHTML = myJson.main.temp;
      weatherCondition.innerHTML = myJson.weather[0].main;
      weatherIcon.innerHTML = `<img src="${myJson.weather[0].icon}"/>`;
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function changeScale() {
  if (tempScale.innerHTML === "C") {
    tempNumber.innerHTML = Math.round(tempNumber.innerHTML * 9 / 5 + 32);
    tempScale.innerHTML = "F";
    console.log(tempScale.innerHTML);
  } else {
    tempNumber.innerHTML = Math.round((tempNumber.innerHTML - 32) * 5 / 9);
    tempScale.innerHTML = "C";
  }
}
tempScale.addEventListener("click", changeScale);
