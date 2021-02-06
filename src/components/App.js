import React from "react";
import SearchBar from "./SearchBar";
import useWeather from "../hooks/useWeather";
import WeatherDetails from "./WeatherDetails";
import "../App.css";

const App = () => {
  const [weather, search] = useWeather(null);
  let forecastList = <>No Results Found</>;
  if (weather[1] && weather[1].length > 0) {
    forecastList = weather[1].map((day) => {
      return (
        <div key={day.datetime} className="ui vertical segment">
          <WeatherDetails weatherInfo={day} />
        </div>
      );
    });
  }
  return (
    <div className="ui container center">
      <div className="container-grid">
        <div className="search-bar">
          <SearchBar onFormSubmit={search} />
        </div>
        <div className="ui segment current-weather">
          <WeatherDetails weatherInfo={weather[0]} />
        </div>
        <div id="forecast-list" className="ui segment">
          {forecastList}
        </div>
      </div>
    </div>
  );
};

export default App;
