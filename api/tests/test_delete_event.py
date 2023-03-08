from fastapi.testclient import TestClient
from main import app
from queries.events import EventQueries

client = TestClient(app)


class FakeEventQueries:
    def delete_trip_event(self, id: int, trip_id: int):
        return True 
    
    def get_all_trip_events(self, trip_id: int):
        return []



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