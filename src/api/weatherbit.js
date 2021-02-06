import axios from "axios";

const KEY = process.env.REACT_APP_WEATHERBIT_KEY;

export default axios.create({
  baseURL: "https://api.weatherbit.io/v2.0",
  params: {
    key: KEY,
  },
});
