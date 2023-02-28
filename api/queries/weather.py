import requests
import os

WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]


class WeatherQueries:
    def get_weather(self, location: str):
        response = requests.get(f"https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={location}&aqi=no")
        response.raise_for_status()
        return response.json()
