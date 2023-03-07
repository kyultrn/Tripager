from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from main import app
from queries.yelp_api import YelpQueries
import os

client = TestClient(app)

YELP_API_KEY = os.environ["YELP_API_KEY"]

class FakeYelpQueries:
    def get_yelp_recommendations(self, term: str, location: str):
        return {}


def test_get_yelp_recommendations():
    #Arrange
    app.dependency_overrides[YelpQueries] = FakeYelpQueries
    #Act
    res = client.get('/api/businesses', params={'term': 'pizza', 'location': 'New York'})
    data = res.json()
    #Assert
    assert res.status_code == 200
    assert data == {}
