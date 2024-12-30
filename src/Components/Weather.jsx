import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./weather.css";
export default function Weather() {

  const [data, setData] = useState({});
  const [usercity, setUserCity] = useState("Hyderabad");
  const [weatherCond, setWeatherCond] = useState("");

  const getWeatherData = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${usercity}&appid=cca4ea37acd9a13bd89af9a68c0abdaf`)
      .then((response) => {
        setData(response.data);
        setWeatherCond(response.data.weather[0].main);
      })
      .catch((error) => { setData(error.response.data) });
  }

  useEffect(() => {
    getWeatherData()
  }, []);


  console.log(data);


  let currentTime = new Date();
  let currentYear = currentTime.getFullYear();
  let weatherClassName;
  if (weatherCond === "Haze") {
    weatherClassName = "fa-solid fa-smog";
  }
  else if (weatherCond === "Clouds") {
    weatherClassName = "fa-solid fa-cloud";
  }
  else if (weatherCond === "rain") {
    weatherClassName = "fa-solid fa-cloud-rain";
  }
  else if (weatherCond === "sunny") {
    weatherClassName = "fa-regular fa-sun";
  }

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

  let currentHour = currentTime.getHours();
  let currentMin = currentTime.getMinutes();
  let period = "AM";

  if (currentHour > 11) {
    period = "PM";
    if (currentHour > 12)
      currentHour -= 12;
  }
  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  if (currentMin < 10) {
    currentMin = "0" + currentMin;
  }
  let actualMonth = months[currentTime.getMonth()];

  let actualDate = currentTime.getDate();


  return (
    <div class="box">
      <input value={usercity} className='city-input' type="text" placeholder='Enter Your City' onChange={(e) => setUserCity(e.target.value)} />
      <span className="material-symbols-outlined" onClick={getWeatherData}>
        search
      </span>

      <div className="wave -one"></div>
      <div className="wave -two"></div>
      <div className="wave -three"></div>

      {data.name == null ? <div className='no-data-found'> {data.message} </div> :
        <div class="info">
          <div id="weathercon">
            <i className={weatherClassName} style={{ color: "#eccc68" }}></i>
          </div>
          <h2 class="location">
            <i class="fa-solid fa-street-view" style={{ color: "white" }}></i>
            {data.name},{data.sys.country}
          </h2>
          <p id='date'>{actualDate} - {actualMonth} - {currentYear}</p>
          <p id='date'>{currentHour + ":" + currentMin + " " + period}</p>
          <h1 class="temp">
            {data.main.temp}&deg;
          </h1>
          <h1 class="tempmin_max">
            Min {data.main.temp_min}&deg; | Max {data.main.temp_max}&deg;
          </h1>
        </div>
      }

    </div>
  );
}
