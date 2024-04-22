const apiKey = "f0a99bbf6ec729059be9b63f4c2931cd";

const weatherAppContainer = document.querySelector(".weatherAppContainer");

const weatherAppInput = document.querySelector(
  ".weatherAppContainer form input"
);

const weatherAppForm = document.querySelector(".weatherAppContainer form");

async function fetchDataFromApi(cityValue) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`
    );
    const data = await response.json();

    weatherAppContainer.lastElementChild.classList.contains("invaild")
      ? weatherAppContainer.lastElementChild.remove()
      : null;
    !response.ok ? generateInvaildCity() : null;

    return await data;
  } catch {}
}

weatherAppForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityValue = weatherAppInput.value;

  const data = await fetchDataFromApi(cityValue);

  const weatherAppData = document.querySelector(
    ".weatherAppContainer .weatherData"
  );
  let weatherDataFounded = false;
  Array.from(weatherAppContainer.children).forEach((ele) => {
    ele.classList.contains("weatherData") ? (weatherDataFounded = true) : null;
  });
  weatherDataFounded ? weatherAppData.remove() : null;

  try {
    data.cod == 200 ? generateWeatherData(data) : null;
  } catch {
    null;
  }
  weatherAppInput.value = "";
});

function generateWeatherData(data) {
  weatherAppContainer.lastElementChild.classList.contains("invaild")
    ? weatherAppContainer.lastElementChild.remove()
    : null;

  const weatherData = document.createElement("div");
  weatherData.classList.add("weatherData");
  weatherAppContainer.appendChild(weatherData);

  const weatherIcon = document.createElement("span");
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">`;
  weatherIcon.classList.add("weatherIcon");
  weatherData.appendChild(weatherIcon);

  const weatherTembrature = document.createElement("span");
  weatherTembrature.innerText = `${data.main.temp}°C`;
  weatherTembrature.classList.add("weatherTembrature");
  weatherData.appendChild(weatherTembrature);

  const description = document.createElement("span");
  description.innerText = `${data.weather[0].description}`;
  description.classList.add("description");
  weatherData.appendChild(description);

  const details = document.createElement("div");
  details.classList.add("details");
  weatherData.appendChild(details);

  const fellsLike = document.createElement("span");
  fellsLike.innerText = `Feels Like:${data.main.feels_like}°C`;
  details.appendChild(fellsLike);

  const Humidity = document.createElement("span");
  Humidity.innerText = `Humidity :${data.main.humidity}%`;
  details.appendChild(Humidity);

  const windSpeed = document.createElement("span");
  windSpeed.innerText = `Wind Speed ${data.wind.speed}m/s`;
  details.appendChild(windSpeed);
}

function generateInvaildCity() {
  const invaildDiv = document.createElement("div");
  invaildDiv.classList.add("invaild");
  weatherAppContainer.appendChild(invaildDiv);

  const invaildIcon = document.createElement("img");
  invaildIcon.src = "./error-message.png";
  invaildDiv.appendChild(invaildIcon);

  const invaildSpan = document.createElement("span");
  invaildSpan.classList.add("invaildCity");
  invaildSpan.innerText = "Invaild City Please enter vaild City";
  invaildDiv.appendChild(invaildSpan);
}
