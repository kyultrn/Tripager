from fastapi.testclient import TestClient
from main import app
from queries.events import EventQueries, EventIn, EventOut
from typing import Optional

client = TestClient(app)


class FakeEventQueries:
    def create_trip_event(self, event: EventIn, trip_id: int) -> EventOut:
        event_dict = event.dict()
        event_dict

    def delete_trip_event(self, id: int, trip_id: int):
        return True

    def get_all_trip_events(self, trip_id: int):
        return []

    def get_trip_event(self,
                       trip_id: int,
                       event_id: int
                       ) -> Optional[EventOut]:
        return {
            'id': event_id,
            'name': 'BBQ',
            'description': 'At the local Y',
            'location': 'Vail, CO',
            'start_time': '2:00',
            'end_time': '5:00',
            'location': 'Vail, CO',
            'picture_url': '',
            'trip_id': trip_id,
            'date': '2023-12-12'
        }


def test_delete_trip_event():
    app.dependency_overrides[EventQueries] = FakeEventQueries

    res = client.delete('/api/trips/1/events/1')
    data = res.json()

    assert res.status_code == 200
    assert data == True

def test_get_all_trip_events():
    app.dependency_overrides[EventQueries] = FakeEventQueries

    res = client.get('/api/trips/1/events')
    data = res.json()

    assert data == []
    assert res.status_code == 200

def test_get_trip_event():
    #Arrange
    app.dependency_overrides[EventQueries] = FakeEventQueries
    #Act
    res = client.get('/api/trips/1/events/2')
    data = res.json()
    #Assert
    assert res.status_code == 200
    assert data['id'] == 2
    assert data['trip_id'] == 1
