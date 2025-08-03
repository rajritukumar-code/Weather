let cityInput = document.getElementById("city_input");
let searchBtn = document.getElementById("searchBtn");
let locationbtn=document.getElementById('locationBtn')
let api_key = "cffbc6617b68b781354362ee2b892124";
let currentWeatherCard = document.querySelectorAll(".weather-left .card")[0];
let fiveDaysForecastCard = document.querySelector(".day-forecast");
let apiCard = document.querySelectorAll(".hightlights .card")[0];
let sunriseCard = document.querySelectorAll(".hightlights .card")[1];
let humidityVal = document.getElementById('humidityVal');
let pressurVal = document.getElementById('pressurVal');
let visibilityVal = document.getElementById('VisibilityVal');
let windSpeedVal = document.getElementById('WindSpeedVal');
let feelsVal = document.getElementById('feelsVal');
let hourlyForcastCard=document.querySelector('.hourly-forecast')
// console.log(pressurVal);


let aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

// console.log(pressurVal,visibilityVal,windSpeedVal,locationbtn);


// get Weather Details start
function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;

  let WEATER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

  let AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

  (days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
    (months = [
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
    ]);
// featch api for Air pollutions
  fetch(AIR_POLLUTION_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { co, no, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
      apiCard.innerHTML = `
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
              <div class="item">
                  <p class="text-center">PM2.5</p>
                  <h2>${pm2_5}</h2>
                </div>

                 <div class="item">
                  <p class="text-center">PM10</p>
                  <h2>${pm10}</h2>
                </div>

                 <div class="item">
                  <p class="text-center">SO2</p>
                  <h2>${so2}</h2>
                </div>

                <div class="item">
                  <p class="text-center">CO</p>
                  <h2>${co}</h2>
                </div>

                <div class="item">
                  <p class="text-center">NO</p>
                  <h2>${no}</h2>
                </div>

                <div class="item">
                  <p class="text-center">NH3</p>
                  <h2>${nh3}</h2>
                </div>

                <div class="item">
                  <p class="text-center">O3</p>
                  <h2>${o3}</h2>
                </div>
              </div>
        `;
      // console.log(data);
    })
    .catch(() => {
      alert("fail to feath");
    });

  fetch(WEATER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML = `
        <div class="current-weather flex justify-between items-center">
              <div class="details">
                <p class="text-[14px] text-[#fff]">Now</p>
                <h2 class="text-[32px] font-medium my-[7px] mx-0">${(
                  data.main.temp - 273.15
                ).toFixed(2)}&deg;C</h2>
                <p class="text-[14px] text-[#999]">${
                  data.weather[0].description
                }</p>
              </div>
              <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${
                  data.weather[0].icon
                }@2x.png" alt="" />
              </div>
            </div>
            <hr />
            <div class="card-footer text-[14px] mb-12px">
              <p class="text-[14px] text-[#999]">
                <i class="bx bx-calendar-alt"></i>${
                  days[date.getDay()]
                }, ${date.getDate()},${
        months[date.getMonth()]
      },${date.getFullYear()}
              </p>
              <p class="text-[14px] text-[#999]">
                <i class="bx bx-location-plus"></i>${name},${country}
              </p>
            </div>`;

      let {sunrise,sunset}=data.sys,
       {timezone, visibility }= data,
       {humidity,pressure
, feels_like }=data.main,
       {speed}=data.wind,
      sRiseTime=moment.utc(sunrise,'X').add(timezone, 'seconds').format('hh:mm A'),
       sSetTime=moment.utc(sunset,'X').add(timezone, 'seconds').format('hh:mm A');
       sunriseCard.innerHTML=`

       <div class="card-head">
                <p class="mb-2.5">Sunrise & Sunset</p>
              </div>
              <div class="sunrise-sunset grid grid-cols-[repeat(2,1fr)]">
                <div class="item flex items-center gap-2.5">
                  <div class="icon">
                    <i class="bx bx-sun text-5xl"></i>
                  </div>
                  <div class="">
                    <p>Sunrise</p>
                    <h2 class="mt-[15px]">${sRiseTime}</h2>
                  </div>
                </div>

                <div class="item flex items-center gap-2.5">
                  <div class="icon">
                    <i class="bx bx-sun text-5xl"></i>
                  </div>
                  <div class="">
                    <p>Sunset</p>
                    <h2 class="mt-[15px]">${sSetTime}</h2>
                  </div>
                </div>
              </div>
       `;

       humidityVal.innerHTML=`${humidity} %`;
       pressurVal.innerHTML=`${pressure
} pha`;
       visibilityVal.innerHTML=`${visibility/1000} Km`;
       windSpeedVal.innerHTML=`${speed} m/s`;
       feelsVal.innerHTML=`${(feels_like - 273.15).toFixed(2)} &deg;C`
        // console.log(data);
    })
    .catch(() => {
      alert("Failed to fetch current Wather");
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let hourlyForcast=data.list;
      hourlyForcastCard.innerHTML='';
      for(i=0; i<=7; i++){
        let hrforcastDate=new Date(hourlyForcast[i].dt_txt);
        let hr=hrforcastDate.getHours();
        let a='PM';
        if(hr<12) a='AM';
        if(hr==0) hr='12';
        if(hr>12) hr= hr-12;
        hourlyForcastCard.innerHTML +=`
        <div
              class="card bg-[#2a2b2d] p-[15px] rounded-[15px] mb-[15px] text-center "
            >
              <p>${hr} ${a}</p>
              <img  src="https://openweathermap.org/img/wn/${hourlyForcast[i].weather[0].icon}.png" alt="" />
              <p>${(hourlyForcast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
            </div>
        `
      }

      let uniqueForcastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forcastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForcastDays.includes(forcastDate)) {
          return uniqueForcastDays.push(forcastDate);
        }
      });
      fiveDaysForecastCard.innerHTML = ``;
      for (i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
             <div
                class="forecast-item grid grid-cols-[repeat(3,1fr)] place-items-center mb-[15px]"
              >
                <div class="icon-wrapper flex items-center">
                  <img
                    src="https://openweathermap.org/img/wn/${
                      fiveDaysForecast[i].weather[0].icon
                    }.png"
                    alt=""
                  />
                  <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(
                    2
                  )}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]}</p>
                <p>${days[date.getDay()]}</p>
              </div>
            `;
      }

      // console.log(fiveDaysForecast);
    })
    .catch(() => {
      alert("failed to fetch weather");
    });
}
// get Weather Details Ends

// get city coordinates start
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
// get city coordinates Ends

// get user coordinates start
function getUsercoodinates(){
  navigator.geolocation.getCurrentPosition(position=>{
    let {latitude, longitude}=position.coords;
    let REVERSE_GEOCODING_URL=`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
    // console.log(latitude, longitude);

    fetch(REVERSE_GEOCODING_URL).then(res=>res.json()).then(data=>{
      let {name,country, state}=data[0];
      getWeatherDetails(name,latitude,longitude,country,state);
      // console.log(data);
    }).catch(()=>{
      alert("Failed to feach user coodinates");
    })
  },error=>{
    if(error.code===error.PERMISSION_DENIED){
      alert("Geollocation permission denied. please reset location permission to grand access again")
    }
  });
}
// get user coordinates start


// addEventLister on search buttons
searchBtn.addEventListener("click", getCityCooordinates);

// addEventLister on location buttons
locationbtn.addEventListener('click',getUsercoodinates);

// addEventLister on Input Box
cityInput.addEventListener('keyup',e=>e.key==='Enter'&& getCityCooordinates());

// addEventLister on defalut location of user
window.addEventListener('load',getUsercoodinates);

