from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from typing import List, Union, Optional
from queries.trips import (
    TripIn,
    TripOut,
    TripQueries,
    Error,
)


router = APIRouter()


@router.post("/api/trips", response_model=TripOut)
def create_trip(
    trip: TripIn,
    repo: TripQueries = Depends()
):
    return repo.create(trip)


@router.get("/api/trips", response_model=Union[List[TripOut], Error])
def get_all_trips(
    repo: TripQueries = Depends(),
):
    return repo.get_all_trips()

@router.get("/api/trips/mytrips", response_model=Union[List[TripOut], Error] )
def get_trips_by_id(
    repo: TripQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print(f"this is account data: {account_data}")
    return repo.get_trips_by_id(account_data["id"])

@router.get("/api/trips/{trip_id}", response_model=Optional[TripOut])
def get_trip(
    trip_id: int,
    response: Response,
    repo: TripQueries = Depends(),
) -> TripOut:
    trip = repo.get_trip(trip_id)
    if trip is None:
        response.status_code = 404
    return trip


@router.put("/api/trips/{trip_id}", response_model=Union[TripOut, Error])
def update_trip(
    trip_id: int,
    trip: TripIn,
    repo: TripQueries = Depends(),
) -> Union[Error, TripOut]:
    return repo.update_trip(trip_id, trip)


@router.delete("/api/trips/{trip_id}", response_model=bool)
def delete_trip(
    trip_id: int,
    repo: TripQueries = Depends(),
) -> bool:
    return repo.delete_trip(trip_id)
