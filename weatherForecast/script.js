const apiKey = "c9ef4dc095a63d7eaeb334a5915be17b";
const cityInput = document.getElementById("city");
const suggestionsList = document.getElementById("suggestions");

function fetchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  hideSuggestions();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

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
}

function fetchCitySuggestions(query) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((results) => {
      if (!Array.isArray(results) || results.length === 0) {
        updateSuggestions([]);
        return;
      }

      const suggestions = results.map((item) => {
        const state = item.state ? `, ${item.state}` : "";
        return `${item.name}${state}, ${item.country}`;
      });

      updateSuggestions(suggestions);
    })
    .catch((error) => {
      console.error("Error fetching city suggestions:", error);
      updateSuggestions([]);
    });
}

function updateSuggestions(items) {
  if (items.length === 0) {
    hideSuggestions();
    return;
  }

  suggestionsList.innerHTML = items
    .map(
      (item) => `<li data-value="${item}">${item}</li>`
    )
    .join("");
  suggestionsList.style.display = "block";
}

function hideSuggestions() {
  suggestionsList.innerHTML = "";
  suggestionsList.style.display = "none";
}

function selectSuggestion(value) {
  cityInput.value = value;
  hideSuggestions();
}

document.getElementById("getWeather").addEventListener("click", fetchWeather);

cityInput.addEventListener("input", function (event) {
  const query = event.target.value.trim();

  if (query.length < 2) {
    hideSuggestions();
    return;
  }

  fetchCitySuggestions(query);
});

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

suggestionsList.addEventListener("click", function (event) {
  const item = event.target.closest("li");
  if (item) {
    selectSuggestion(item.dataset.value);
  }
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".input-wrapper")) {
    hideSuggestions();
  }
});
