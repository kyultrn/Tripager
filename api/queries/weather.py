import requests
import os

W = os.environ["WEATHER_API_KEY"]


class WeatherQueries:
    def get_weather(self, latitude: str, longitude: str):
        r = requests.get("https://api.weatherapi.com/v1/current.json?key="
                         + W
                         + "&q="
                         + latitude
                         + ","
                         + longitude)
        r.raise_for_status()
        return r.json()
