const apiKey = "c9ef4dc095a63d7eaeb334a5915be17b";
const cityInput = document.getElementById("city");
const suggestionsList = document.getElementById("suggestions");
const recentList = document.getElementById("recentList");
const unitToggle = document.getElementById("unitToggle");
const recentSearchesKey = "recentWeatherSearches";
const weatherUnitKey = "weatherUnit";
let currentUnit = localStorage.getItem(weatherUnitKey) || "metric";

function loadRecentSearches() {
  const stored = localStorage.getItem(recentSearchesKey);
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(searches) {
  localStorage.setItem(recentSearchesKey, JSON.stringify(searches));
}

function saveCurrentUnit() {
  localStorage.setItem(weatherUnitKey, currentUnit);
}

function getTemperatureUnit() {
  return currentUnit === "metric" ? "°C" : "°F";
}

function getWindSpeedUnit() {
  return currentUnit === "metric" ? "m/s" : "mph";
}

function getUvRisk(uvi) {
  if (uvi >= 11) return { label: "Extreme", className: "uv-extreme" };
  if (uvi >= 8) return { label: "Very High", className: "uv-very-high" };
  if (uvi >= 6) return { label: "High", className: "uv-high" };
  if (uvi >= 3) return { label: "Moderate", className: "uv-moderate" };
  return { label: "Low", className: "uv-low" };
}

function updateUnitToggleButton() {
  unitToggle.textContent = currentUnit === "metric" ? "Switch to °F" : "Switch to °C";
}

function fetchUvIndex(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.current ? data.current.uvi : null);
}

function addRecentSearch(city) {
  if (!city) return;

  const searches = loadRecentSearches();
  const normalized = city.toLowerCase();
  const updated = [city, ...searches.filter((item) => item.toLowerCase() !== normalized)];
  const limited = updated.slice(0, 5);
  saveRecentSearches(limited);
  renderRecentSearches();
}

function renderRecentSearches() {
  const searches = loadRecentSearches();
  if (searches.length === 0) {
    recentList.innerHTML = "<li class=\"empty\">No recent searches yet.</li>";
    return;
  }

  recentList.innerHTML = searches
    .map((item) => `<li data-value="${item}">${item}</li>`)
    .join("");
}

function fetchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  hideSuggestions();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${currentUnit}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const temperatureUnit = getTemperatureUnit();
        const windUnit = getWindSpeedUnit();
        const weatherInfo = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}${temperatureUnit}</p>
                    <p>Feels like: ${data.main.feels_like}${temperatureUnit}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Wind Speed: ${data.wind.speed} ${windUnit}</p>
                `;
        document.getElementById("weatherResult").innerHTML = weatherInfo;
        addRecentSearch(city);

        fetchUvIndex(data.coord.lat, data.coord.lon)
          .then((uvi) => {
            if (uvi !== null && uvi !== undefined) {
              const risk = getUvRisk(uvi);
              const uvHtml = `<p>UV Index: <span class="uv-index ${risk.className}">${uvi.toFixed(1)} (${risk.label})</span></p>`;
              document.getElementById("weatherResult").insertAdjacentHTML("beforeend", uvHtml);
            }
          })
          .catch((error) => {
            console.error("Error fetching UV index:", error);
          });
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
unitToggle.addEventListener("click", function () {
  currentUnit = currentUnit === "metric" ? "imperial" : "metric";
  saveCurrentUnit();
  updateUnitToggleButton();
});

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

recentList.addEventListener("click", function (event) {
  const item = event.target.closest("li");
  if (item && item.dataset.value) {
    cityInput.value = item.dataset.value;
    fetchWeather();
  }
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".input-wrapper")) {
    hideSuggestions();
  }
});

updateUnitToggleButton();
renderRecentSearches();
