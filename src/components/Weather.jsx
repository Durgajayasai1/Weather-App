import Lottie from "lottie-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { fetchWeather } from "../services/WeatherService";

const Weather = () => {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) return;

    setIsLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      await mapWeatherToAnimation(data.weather[0].main);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapWeatherToAnimation = async (condition) => {
    const animations = {
      Clear: "/animations/sunny.json",
      Rain: "/animations/rainy.json",
      Clouds: "/animations/clouds.json",
    };
    const animationUrl = animations[condition] || "/animations/sunny.json";

    try {
      const response = await fetch(animationUrl);
      const json = await response.json();
      setAnimationData(json);
    } catch (error) {
      console.error("Error loading Lottie animation:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sora text-white p-4 md:p-5">
      <h1 className="text-5xl md:text-7xl text-center text-white font-extrabold select-none">
        Weather App
      </h1>
      <p className="text-sm md:text-base text-gray-400 mt-2 select-none text-center">
        Weather is what we get, climate is what we expect.
      </p>
      <div className="flex flex-col w-full items-center justify-center max-w-md md:max-w-none md:flex-row gap-2 mt-7 mb-4 px-4 md:px-0">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 text-white rounded-md border-2 w-full md:w-[400px] border-gray-400 focus:border-gray-300 focus:outline-none transition-all duration-200"
        />
        <button
          onClick={getWeather}
          disabled={isLoading}
          className="bg-white text-black flex items-center justify-center px-4 py-2 rounded-md cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {isLoading ? <ClipLoader size={20} color="#000000" /> : "Search"}
        </button>
      </div>
      {isLoading ? (
        <div className="mt-8">
          <ClipLoader size={50} color="#FFFFFF" />
        </div>
      ) : (
        weather && (
          <div className="text-center w-[90%] md:w-[490px] h-[400px] md:h-[500px] mt-6 md:mt-10 border-2 border-gray-400 flex flex-col items-center justify-center rounded-md p-4">
            <h1 className="text-2xl md:text-3xl font-bold select-none">
              {weather.name}
            </h1>
            <p className="text-lg md:text-xl select-none mt-2">
              {weather.weather[0].main}
            </p>
            <p className="text-xl md:text-2xl select-none mt-2">
              {weather.main.temp}°C
            </p>
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="h-40 w-40 md:h-60 md:w-60 mt-4"
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
