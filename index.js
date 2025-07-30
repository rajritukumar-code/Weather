let cityInput = document.getElementById("city_input");
let searchBtn = document.getElementById("searchBtn");
let api_key = "cffbc6617b68b781354362ee2b892124";
let currentWeatherCard = document.querySelectorAll(".weather-left .card")[0];
let fiveDaysForecastCard=document.querySelector(".day-forecast");
let apiCard=document.querySelectorAll('.highlights .card')[0];
let aqiList=['Good', 'Fair','Moderate','Poor','Very Poor'];

console.log(currentWeatherCard);

function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;

  let WEATER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

  let AIR_POLLUTION_API_URL=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`

  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    fetch(AIR_POLLUTION_API_URL).then(res=>res.json()).then(data=>{
        let {co,no,no2,o3,so4,pm2_5,pm10, nh3}=data.list[0].components;
        apiCard.innerHTML=`
        <div
                class="card-head flex justify-between mb-[10px] "
              >
                <p>Air Quality Index</p>
                <p
                  class="air-index api-${data.list[0].main.aqi} text-[#000] py-[5px] px-[10px] rounded-[15px]"
                >
                  ${aqiList[data.list[0].main.aqi - 1]}
                </p>
              </div>
              <div
                class="air-indices grid grid-cols-[repeat(4,1fr)] place-items-center"
              >
                <i class="bx bx-wind text-5xl"></i>
                <div class="item">
                  <p class="text-center">PM2.5</p>
                  <h2>____</h2>
                </div>

                <div class="item">
                  <p class="text-center">PM10</p>
                  <h2>____</h2>
                </div>

                <div class="item">
                  <p class="text-center">SO2</p>
                  <h2>____</h2>
                </div>

                <div class="item">
                  <p class="text-center">CO</p>
                  <h2>____</h2>
                </div>

                <div class="item">
                  <p class="text-center">NO</p>
                  <h2>____</h2>
                </div>

                <div class="item">
                  <p class="text-center">N02</p>
                  <h2>___</h2>
                </div>

                <div class="item">
                  <p class="text-center">NH3</p>
                  <h2>___</h2>
                </div>

                <div class="item">
                  <p class="text-center">O3</p>
                  <h2>___</h2>
                </div>
              </div>
            </div>`
        console.log(data);
    }).catch(()=>{
        alert("fail to feath")
    })

  fetch(WEATER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML=`
        <div class="current-weather flex justify-between items-center">
              <div class="details">
                <p class="text-[14px] text-[#fff]">Now</p>
                <h2 class="text-[32px] font-medium my-[7px] mx-0">${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                <p class="text-[14px] text-[#999]">${data.weather[0].description}</p>
              </div>
              <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
              </div>
            </div>
            <hr />
            <div class="card-footer text-[14px] mb-12px">
              <p class="text-[14px] text-[#999]">
                <i class="bx bx-calendar-alt"></i>${days[date.getDay()]}, ${date.getDate()},${months[date.getMonth()]},${date.getFullYear()}
              </p>
              <p class="text-[14px] text-[#999]">
                <i class="bx bx-location-plus"></i>${name},${country}
              </p>
            </div>`

    //   console.log(data);
    })
    .catch(() => {
      alert("Failed to fetch current Wather");
    });

    fetch(FORECAST_API_URL)
    .then(res=>res.json())
    .then(data=>{
        let uniqueForcastDays=[];
        let fiveDaysForecast=data.list.filter(forecast=>{
            let forcastDate= new Date(forecast.dt_txt).getDate();
            if(!uniqueForcastDays.includes(forcastDate)){
                return uniqueForcastDays.push(forcastDate);
            }
        });
        fiveDaysForecastCard.innerHTML=``;
        for(i=1;i<fiveDaysForecast.length;i++){
            let date= new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML+=`
             <div
                class="forecast-item grid grid-cols-[repeat(3,1fr)] place-items-center mb-[15px]"
              >
                <div class="icon-wrapper flex items-center">
                  <img
                    src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png"
                    alt=""
                  />
                  <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]}</p>
                <p>${days[date.getDay()]}</p>
              </div>
            `
        }
         
        // console.log(fiveDaysForecast);
    }).catch(()=>{
        alert("failed to fetch weather")
    })
}

function getCityCooordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) {
    alert("Please enter a city name");
    return;
  }
  let GEOCODEING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODEING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(
        "Failed to  fetch  coordinates of ${cityName}. Please try again later."
      );
    });
}

searchBtn.addEventListener("click", getCityCooordinates);
