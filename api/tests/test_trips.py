from fastapi.testclient import TestClient
from main import app
from queries.trips import TripQueries
from authenticator import authenticator
from queries.trips import TripOut, TripIn
import json

client = TestClient(app)

def fake_get_current_account_data():
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
        trip_dict =  trip.dict()
        return TripOut(id=1, **trip_dict)

def test_get_trips():
    #Arrange
    app.dependency_overrides[TripQueries] = FakeTripQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    #Act
    res = client.get('/api/trips/mytrips')
    data = res.json()
    #Assert
    assert data == []
    assert res.status_code == 200

def test_create_trip():
    #Arrange
    app.dependency_overrides[TripQueries] = FakeTripQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    #Act
    trip = {
        "name": "Miami Trip",
        "city": "Miami",
        "state": "Florida",
        "start_date": "2023-03-06",
        "end_date": "2023-03-23"
    }
    res = client.post('/api/trips', json.dumps(trip))
    data = res.json()

    #Assert
    assert res.status_code == 200
    # assert data['id'] == 1
    # assert data['account_id'] == 99
    assert data == {
        "id": 1,
        "name": "Miami Trip",
        "city": "Miami",
        "state": "Florida",
        "start_date": "2023-03-06",
        "end_date": "2023-03-23"
    }

def test_update_trip():
    #Arrange
    app.dependency_overrides[TripQueries] = FakeTripQueries
    #Act
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
