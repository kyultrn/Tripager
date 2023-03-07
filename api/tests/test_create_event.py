from fastapi.testclient import TestClient
from main import app
from queries.events import EventsQueries, EventIn, EventOut


class FakeEventQueries:
    def create_trip_event(self, event: EventIn, trip_id: int) -> EventOut:
        event_dict = event.dict()
        event_dict
