import React from "react";

const WeatherDetails = ({ weatherInfo }) => {
  if (!weatherInfo || weatherInfo.length === 0) {
    return <>No Results Found</>;
  }
  // show the location only in today's weather segment
  const weatherDesc = (weatherInfo) => {
    if (weatherInfo.city_name) {
      return (
        <>
          Weather in {weatherInfo.city_name}, {weatherInfo.country_code}:{" "}
        </>
      );
    }
    return;
  };
  // forecast API endpoint (unlike the current day weather endpoint)
  // doesn't provide avg apparent temperature, needs to be found manually
  const tempInfo = (weatherInfo) => {
    let appTemp = "";
    if (weatherInfo.app_temp !== undefined) {
      appTemp = weatherInfo.app_temp;
    } else {
      appTemp = (
        (weatherInfo.app_max_temp + weatherInfo.app_min_temp) /
        2
      ).toFixed(1);
    }
    return (
      <>
        Temperature: {weatherInfo.temp} (Feels Like: {appTemp})
      </>
    );
  };
  return (
    <div className="weather-content">
      <div className="datetime center">{weatherInfo.datetime}</div>
      <div className="weather-desc center">
        {weatherDesc(weatherInfo)}
        {weatherInfo.weather.description}
        <img
          src={`https://www.weatherbit.io/static/img/icons/${weatherInfo.weather.icon}.png`}
          alt=""
          className="weather-icon"
        />
      </div>
      <div className="weather-extra ceter">
        <div>Relative Humidity: {weatherInfo.rh} %</div>
        <div>Pressure: {weatherInfo.pres} mb</div>
      </div>
      <div className="temp-info center">{tempInfo(weatherInfo)}</div>
    </div>
  );
};

export default WeatherDetails;
