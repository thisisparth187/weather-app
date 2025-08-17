

const apiKey = "4c515de06b3af6bcbaa40873b80b6a46"; // your Weatherstack key

async function searchCity(city) {
    try {
        const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.error) {
            throw new Error(data.error.info);
        }

        // Update UI
        document.getElementById("cityName").textContent = data.location.name;
        document.getElementById("weather-description").textContent = data.current.weather_descriptions[0];
        document.getElementById("temperature").textContent = data.current.temperature + "°";

        // Replace fake min/max with real feelslike + wind
        document.querySelector(".minTemp").textContent = data.current.feelslike + "°";
        document.querySelector(".maxTemp").textContent = data.current.wind_speed + " km/h";

        // Weather icon (custom mapping)
        const desc = data.current.weather_descriptions[0];
        document.getElementById("weatherIcon").setAttribute("href", getCustomIcon(desc));

    } catch (error) {
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("errorMsg").textContent = error.message;
    }
}

// Search button event
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("searchCity").value.trim();
    if (city) {
        document.getElementById("errorMsg").style.display = "none"; // hide error
        searchCity(city);
    }
});

// Custom icon mapper
function getCustomIcon(description) {
    description = description.toLowerCase();

    if (description.includes("cloud")) return "images/cloud.png";
    if (description.includes("rain")) return "images/rain.png";
    if (description.includes("sun") || description.includes("clear")) return "images/sun.png";
    if (description.includes("snow")) return "images/snow.png";
    if (description.includes("mist") || description.includes("fog") || description.includes("haze")) return "images/mist.png";

    return "images/image.png"; // fall
}

const themeToggle = document.querySelector('.ui-switch input');

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.documentElement.classList.add('light'); // switch to light
  } else {
    document.documentElement.classList.remove('light'); // back to dark
  }
});
