const apiKey = "c9ef4dc095a63d7eaeb334a5915be17b";

document.getElementById("getWeather").addEventListener("click", function () {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weatherInfo = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Feels like: ${data.main.feels_like}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
        document.getElementById("weatherResult").innerHTML = weatherInfo;
      } else {
        document.getElementById("weatherResult").innerHTML =
          `<p>Error: ${data.message}</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherResult").innerHTML =
        "<p>Failed to fetch weather data. Please try again.</p>";
    });
});
