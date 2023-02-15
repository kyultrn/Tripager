from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import List, Union


from queries.trips import (
    TripIn,
    TripOut,
    TripQueries,
    Error,
)

router = APIRouter()

@router.post("/trips", response_model=TripOut)
def create_trip(
    trip: TripIn,
    repo: TripQueries = Depends()
):
   return repo.create(trip)

@router.get("/trips", response_model=Union[List[TripOut], Error])
def get_all_trips(
    repo: TripQueries = Depends(),
):
    return repo.get_all_trips()
