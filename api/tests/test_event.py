from fastapi.testclient import TestClient
from main import app
from queries.events import EventQueries, EventIn, EventOut
from typing import Optional
from authenticator import authenticator
import json

client = TestClient(app)


def fakeData():
    return {
        'id': 1,
        'username': 'fakeuser'
    }


class FakeEventQueries:
    def create_trip_event(self, event: EventIn, trip_id: int):
        event_dict = event.dict()
        event_dict['id'] = 1
        event_dict['trip_id'] = trip_id
        return event_dict

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
    assert data is True


def test_get_all_trip_events():
    app.dependency_overrides[EventQueries] = FakeEventQueries
    res = client.get('/api/trips/1/events')
    data = res.json()
    assert data == []
    assert res.status_code == 200


def test_get_trip_event():
    app.dependency_overrides[EventQueries] = FakeEventQueries
    res = client.get('/api/trips/1/events/2')
    data = res.json()
    assert res.status_code == 200
    assert data['id'] == 2
    assert data['trip_id'] == 1


def test_create_trip_event():
    app.dependency_overrides[EventQueries] = FakeEventQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fakeData
    event = {
        "name": "test",
        "description": "test",
        "location": "test",
        "date": "2023-3-3",
        "start_time": "10:10",
        "end_time": "11:11",
        "picture_url": "",
    }
    trip_id = 1
    res = client.post(f'api/trips/{trip_id}/events', json.dumps(event))
    data = res.json()
    assert res.status_code == 200
    assert data == {
        "name": "test",
        "description": "test",
        "location": "test",
        "date": "2023-03-03",
        "start_time": "10:10:00",
        "end_time": "11:11:00",
        "picture_url": "",
        "id": 1,
        "trip_id": trip_id,
    }
