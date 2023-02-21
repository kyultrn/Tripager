from fastapi import (
    Depends,
    APIRouter,
)
from queries.weather import WeatherQueries
from fastapi import APIRouter

router = APIRouter()

@router.get("/api/weather")
def get_weather(
    location: str,
    repo: WeatherQueries = Depends()
):
    return repo.get_weather(
        location,
    )
