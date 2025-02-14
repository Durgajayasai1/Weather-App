import axios from "axios";

const API_KEY = "887d3609656908972a346524d67cc852";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  const response = await axios.get(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
