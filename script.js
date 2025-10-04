document.getElementById("searchBtn").addEventListener("click", getWeatherByCity);

const apiKey = '803b484d6b9d2182610cbbdeb8e7b44b';

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    document.getElementById("weather").innerHTML = "⚠️ Please enter a city name!";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    document.getElementById("weather").innerHTML = "❌ Geolocation not supported!";
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
  }

  function error() {
    document.getElementById("weather").innerHTML = "⚠️ Location access denied!";
  }
}

async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weather").innerHTML = `❌ ${data.message}`;
      return;
    }

    document.getElementById("weather").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temp: ${data.main.temp} °C</p>
      <p>🌥 Weather: ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weather").innerHTML = "⚠️ Error fetching data!";
  }
}
