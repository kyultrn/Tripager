import requests
import os

WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]


class WeatherQueries:
    def get_weather(self, latitude: str, longitude: str):
        response = requests.get(f"https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={latitude},{longitude}")
        response.raise_for_status()
        return response.json()
