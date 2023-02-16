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


@router.post("/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventQueries = Depends()
):
    return repo.create(event)


@router.get("/trips/{trip_id}/events", response_model=Union[List[EventOut], Error])
def get_trip_events(
    trip_id: int,
    response: Response,
    repo: EventQueries = Depends(),
) -> EventOut:
    trip_events = repo.get_trip_events(trip_id)
    if trip_events is None:
        response.status_code = 404
    return trip_events

