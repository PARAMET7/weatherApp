const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "61cd8cca30c47b5e6d3c547df0711d17"

weatherForm.addEventListener("submit", async e=> {
  e.preventDefault();
  const city = cityInput.value;

  if (city) {
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error)
    {
      console.error(error);
      displayError(error);
    }

  }
  else{
    displayError("Please enter a city")
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const res = await fetch(apiUrl);
  console.log(res);

  if (!res.ok){
    throw new Error("Could not fetch data");

  }
  return await res.json();
}

function displayWeatherInfo(data) {
  console.log("data:",data);

  const {name: city,
         main:{temp, humidity},
         weather:[{description, id}]} = data;

  card.textContent = "";
  card.style.display="flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent =`${(temp-273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `humidity: ${humidity}`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);


  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji")


  card.append(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);


}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case (weatherId >= 200 && weatherId<300):
      return "⛈️";
    case (weatherId >= 300 && weatherId<400):
      return "🌧️";
    case (weatherId >= 500 && weatherId<600):
      return "🌧️";
      return "";
    case (weatherId >= 600 && weatherId<700):
      return "❄️";
    case (weatherId >= 700 && weatherId<800):
      return "🌥️";
    case (weatherId === 800):
        return "🌞";
    case (weatherId >= 801 && weatherId<810):
      return "🌥️";
    default:
      return "?";
  }

}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);


}
