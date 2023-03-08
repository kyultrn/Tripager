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
    #Arrange
    app.dependency_overrides[WeatherQueries] = FakeWeatherQueries
    #Act
    res = client.get('/api/weather', params={"latitude": "23", "longitude": "42"})
    data = res.json()
    #Assert
    assert res.status_code == 200

    # assert isinstance(data, dict)
