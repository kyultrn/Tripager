from pydantic import BaseModel
from typing import Optional, List, Union
import requests
from queries.pool import pool
import os

YELP_API_KEY = os.environ["YELP_API_KEY"]

class YelpQueries:
    def get_yelp_recommendations(term: str, location: str):
        headers = {
            "Authorization": f"Bearer {YELP_API_KEY}"
        }
        response = requests.get(f"https://api.yelp.com/v3/businesses/search?location={location}&term={term}&sort_by=best_match&limit=5", headers=headers)
        response.raise_for_status()
        return response.json()
