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
    #Arrange
    app.dependency_overrides[YelpQueries] = FakeYelpQueries
    # headers = {"Authorization": f"Bearer {FAKE_YELP_API_KEY}"}
    #Act
    res = client.get('/api/businesses', params={'term': 'pizza', 'location': '10011'})
    data = res.json()
    #Assert
    assert res.status_code == 200
    assert isinstance(data, dict)
