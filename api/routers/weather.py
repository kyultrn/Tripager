from fastapi import (
    Depends,
    APIRouter,
)
from queries.weather import WeatherQueries


router = APIRouter()


@router.get("/api/weather")
def get_weather(
    latitude: str,
    longitude: str,
    repo: WeatherQueries = Depends()
):
    return repo.get_weather(latitude, longitude)
