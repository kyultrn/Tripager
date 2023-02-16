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


from queries.events import (
    EventIn,
    EventOut,
    EventQueries,
    Error,
)


router = APIRouter()


@router.post("/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventQueries = Depends()
):
   return repo.create(event)


# @router.get("/trips", response_model=Union[List[TripOut], Error])
# def get_all_trips(
#     repo: TripQueries = Depends(),
# ):
#     return repo.get_all_trips()


# @router.get("/trips/{trip_id}", response_model=Optional[TripOut])
# def get_trip(
#     trip_id: int,
#     response: Response,
#     repo: TripQueries = Depends(),
# ) -> TripOut:
#     trip = repo.get_trip(trip_id)
#     if trip is None:
#         response.status_code = 404
#     return trip


# @router.put("/trips/{trip_id}", response_model=Union[TripOut, Error])
# def update_trip(
#     trip_id: int,
#     trip: TripIn,
#     repo: TripQueries = Depends(),
# ) -> Union[Error, TripOut]:
#     return repo.update_trip(trip_id, trip)


# @router.delete("/trips/{trip_id}", response_model=bool)
# def delete_trip(
#     trip_id: int,
#     repo: TripQueries = Depends(),
# ) -> bool:
#     return repo.delete_trip(trip_id)

