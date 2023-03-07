from fastapi.testclient import TestClient
from main import app
from queries.trips import TripQueries

client = TestClient(app)
class FakeTripQueries:
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
    assert data == True
