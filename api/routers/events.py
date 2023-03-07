from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from typing import List, Union, Optional
from queries.events import (
    EventIn,
    EventOut,
    EventQueries,
    Error,
)


router = APIRouter()


@router.post("/api/trips/{trip_id}/events", response_model=EventOut)
def create_trip_event(
    trip_id: int,
    event: EventIn,
    repo: EventQueries = Depends()
):
    return repo.create_trip_event(event, trip_id)


@router.get(
        "/api/trips/{trip_id}/events",
        response_model=Union[List[EventOut], Error])
def get_all_trip_events(
    trip_id: int,
    response: Response,
    repo: EventQueries = Depends(),
) -> EventOut:
    trip_events = repo.get_all_trip_events(trip_id)
    if trip_events is None:
        response.status_code = 404
    return trip_events


@router.get(
        "/api/trips/{trip_id}/events/{event_id}",
        response_model=Optional[EventOut])
def get_trip_event(
    trip_id: int,
    event_id: int,
    response: Response,
    repo: EventQueries = Depends(),
) -> EventOut:
    trip_event = repo.get_trip_event(trip_id, event_id)
    if trip_event is None:
        response.status_code = 404
    return trip_event


@router.put(
        "/api/trips/{trip_id}/events/{event_id}",
        response_model=Union[EventOut, Error])
def update_trip_event(
    trip_id: int,
    event_id: int,
    event: EventIn,
    repo: EventQueries = Depends(),
) -> Union[Error, EventOut]:
    return repo.update_trip_event(trip_id, event_id, event)


@router.delete("/api/trips/{trip_id}/events/{event_id}", response_model=bool)
def delete_trip_event(
    trip_id: int,
    event_id: int,
    repo: EventQueries = Depends(),
) -> bool:
    return repo.delete_trip_event(event_id, trip_id)
