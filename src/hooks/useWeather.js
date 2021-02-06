import { useState, useEffect } from "react";
import weatherbit from "../api/weatherbit";

const useWeather = () => {
  const [weather, setWeather] = useState([]);

  // make an API call based on geolocation right after render
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => search(position),
      (err) => console.log(err.message)
    );
  }, []);

  const search = async (inputs) => {
    let [city, lat, lon, unitsSelected] = [null, null, null, "M"];
    let results = [];
    // if search is based on the geolocation object - pass latitude and longitude params,
    // if not – pass city param
    if (inputs.coords !== undefined) {
      lat = inputs.coords.latitude;
      lon = inputs.coords.longitude;
    } else {
      city = inputs.searchTerm;
      unitsSelected = inputs.unitsSelected;
    }
    // access current weather API endpoint (a lot more accurate for the current day)
    const responseCurrent = weatherbit.get("/current", {
      headers: {
        "Accept-Language": null,
        "Content-Type": "application/json",
      },
      params: {
        city: city,
        lat: lat,
        lon: lon,
        units: unitsSelected,
      },
    });
    // access forecast API endpoint
    const responseForecast = weatherbit.get("/forecast/daily", {
      headers: {
        "Accept-Language": null,
        "Content-Type": "application/json",
      },
      params: {
        city: city,
        lat: lat,
        lon: lon,
        units: unitsSelected,
      },
    });
    let responses = await Promise.all([responseCurrent, responseForecast]);
    // combine both responses
    if (responses[0].request.status === 200 && responses.length === 2) {
      // exclude the current day from the forecast response
      results = [
        responses[0].data.data[0],
        responses[1].data.data.slice(1, -1),
      ];
    }
    setWeather(results);
  };
  return [weather, search];
};

export default useWeather;
