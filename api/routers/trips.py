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
from typing import List, Union, Optional


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

@router.get("/trips/{trip_id}", response_model=Optional[TripOut])
def get_trip(
    trip_id: int,
    response: Response,
    repo: TripQueries = Depends(),
) -> TripOut:
    trip = repo.get_trip(trip_id)
    if trip is None:
        response.status_code = 404
    return trip
