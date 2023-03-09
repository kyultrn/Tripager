from fastapi.testclient import TestClient
from main import app
from queries.weather import WeatherQueries
import os

client = TestClient(app)

WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]


class FakeWeatherQueries:
    def get_weather(self, latitude, longitude):
        return {}


def test_get_weather():
    app.dependency_overrides[WeatherQueries] = FakeWeatherQueries
    res = client.get('/api/weather',
                     params={"latitude": "23", "longitude": "42"})
    assert res.status_code == 200
