from fastapi.testclient import TestClient
from main import app
from queries.yelp_api import YelpQueries
import os

client = TestClient(app)

FAKE_YELP_API_KEY = os.environ["YELP_API_KEY"]

class FakeYelpQueries:
    def get_yelp_recommendations(self, term: str, location: str):
        return {}


def test_get_yelp_recommendations():
    app.dependency_overrides[YelpQueries] = FakeYelpQueries
    res = client.get('/api/businesses', params={'term': 'pizza', 'location': '10011'})
    data = res.json()
    assert res.status_code == 200
    assert isinstance(data, dict)
