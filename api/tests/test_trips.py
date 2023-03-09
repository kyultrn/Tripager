from fastapi.testclient import TestClient
from main import app
from queries.trips import TripQueries
from authenticator import authenticator
from queries.trips import TripOut
import json

client = TestClient(app)


def fakeData():
    return {
        'id': 9,
        'username': 'fakeuser'
    }


class FakeTripQueries:
    def get_trips_by_id(self, account_id: int):
        return []

    def create(self, trip, acc_id: int):
        trip_dict = trip.dict()
        trip_dict['id'] = 1
        return trip_dict

    def update_trip(self, trip_id, trip) -> TripOut:
        trip_dict = trip.dict()
        return TripOut(id=1, **trip_dict)

    def get_trip(self, trip_id: int):
        return {
            'id': trip_id,
            'name': "trip",
            'city': "trip",
            'state': "trip",
            'start_date': 2023-3-6,
            'end_date': 2023-3-7,
        }

    def delete_trip(self, trip_id: int) -> bool:
        return True


def test_get_trips():
    app.dependency_overrides[TripQueries] = FakeTripQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fakeData
    res = client.get('/api/trips/mytrips')
    data = res.json()
    assert data == []
    assert res.status_code == 200


def test_create_trip():
    app.dependency_overrides[TripQueries] = FakeTripQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fakeData
    trip = {
        "name": "Miami Trip",
        "city": "Miami",
        "state": "Florida",
        "start_date": "2023-03-06",
        "end_date": "2023-03-23"
    }
    res = client.post('/api/trips', json.dumps(trip))
    data = res.json()
    assert res.status_code == 200
    assert data == {
        "id": 1,
        "name": "Miami Trip",
        "city": "Miami",
        "state": "Florida",
        "start_date": "2023-03-06",
        "end_date": "2023-03-23"
    }


def test_update_trip():
    app.dependency_overrides[TripQueries] = FakeTripQueries
    trip = {
        "name": "Miami Trip",
        "city": "Miami",
        "state": "Florida",
        "start_date": "2023-03-06",
        "end_date": "2023-03-23"
    }
    res = client.put("/api/trips/1", json.dumps(trip))
    data = res.json()
    assert res.status_code == 200
    assert data == {
        "id": 1,
        "name": "Miami Trip",
        "city": "Miami",
        "state": "Florida",
        "start_date": "2023-03-06",
        "end_date": "2023-03-23"
    }


def test_get_trip():
    app.dependency_overrides[TripQueries] = FakeTripQueries
    res = client.get('api/trips/2')
    data = res.json()
    assert res.status_code == 200
    assert data['id'] == 2


def test_delete_trip():
    app.dependency_overrides[TripQueries] = FakeTripQueries
    res = client.delete('api/trips/2')
    data = res.json()
    assert res.status_code == 200
    assert data is True
