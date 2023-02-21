from fastapi import (
    Depends,
    APIRouter,
)
from queries.yelp_api import YelpQueries
from fastapi import APIRouter

router = APIRouter()

@router.get("/api/businesses")
def get_yelp_recommendations(
    term: str,
    location: str,
    repo: YelpQueries = Depends()
):
    return repo.get_yelp_recommendations(
        term,
        location,
    )
