const apikey = "a95eefe84754b1d30c29adb080864bf4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=germany&units=metric";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-name");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = cityInputEl.value;
    getWeatherData(cityName);
});

async function getWeatherData(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network Response was not okay");
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        const iconEl = weatherDataEl.querySelector(".icon");
        if (iconEl) {
            iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        }

        const temperatureEl = weatherDataEl.querySelector(".temperature");
        if (temperatureEl) {
            temperatureEl.textContent = `${temperature}°C`;
        }

        const descriptionEl = weatherDataEl.querySelector(".description");
        if (descriptionEl) {
            descriptionEl.textContent = description;
        }

        const detailsEl = weatherDataEl.querySelector(".details");
        if (detailsEl) {
            detailsEl.innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Check each element before updating to avoid errors
        const iconEl = weatherDataEl.querySelector(".icon");
        if (iconEl) {
            iconEl.innerHTML = "";
        }

        const temperatureEl = weatherDataEl.querySelector(".temperature");
        if (temperatureEl) {
            temperatureEl.textContent = "";
        }

        const descriptionEl = weatherDataEl.querySelector(".description");
        if (descriptionEl) {
            descriptionEl.textContent = "Error: City not found or invalid input.";
        }

        const detailsEl = weatherDataEl.querySelector(".details");
        if (detailsEl) {
            detailsEl.innerHTML = "";}
    }
}

