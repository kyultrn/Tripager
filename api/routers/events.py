from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)


from jwtdown_fastapi.authentication import Token
from typing import List, Union, Optional


from queries.events import (
    EventIn,
    EventOut,
    EventQueries,
    Error,
)


router = APIRouter()


@router.post("/api/trips/{trip_id}/events", response_model=EventOut)
def create_event(
    trip_id: int,
    event: EventIn,
    repo: EventQueries = Depends()
):
   return repo.create_event(event, trip_id)


@router.get("/api/trips/{trip_id}/events", response_model=Union[List[EventOut], Error])
def get_trip_events(
    trip_id: int,
    response: Response,
    repo: EventQueries = Depends(),
) -> EventOut:
    trip_events = repo.get_trip_events(trip_id)
    if trip_events is None:
        response.status_code = 404
    return trip_events

@router.get("/api/trips/{trip_id}/events/{event_id}", response_model=Optional[EventOut])
def get_event(
    trip_id: int,
    event_id: int,
    response: Response,
    repo: EventQueries = Depends(),
) -> EventOut:
    trip_event = repo.get_event(trip_id, event_id)
    if trip_event is None:
        response.status_code = 404
    return trip_event


@router.put("/api/trips/{trip_id}/events/{event_id}", response_model=Union[EventOut, Error])
def update_event(
    trip_id: int,
    event_id: int,
    event: EventIn,
    repo: EventQueries = Depends(),
) -> Union[Error, EventOut]:
    return repo.update_event(trip_id, event_id, event)


# @router.delete("/trips/{trip_id}", response_model=bool)
# def delete_trip(
#     trip_id: int,
#     repo: TripQueries = Depends(),
# ) -> bool:
#     return repo.delete_trip(trip_id)
