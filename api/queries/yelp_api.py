import requests
import os


YELP_API_KEY = os.environ["YELP_API_KEY"]


class YelpQueries:
    def get_yelp_recommendations(self, term: str, location: str):
        headers = {
            "Authorization": f"Bearer {YELP_API_KEY}"
        }
        url = "https://api.yelp.com/v3/businesses/search"
        params = {
            "location": location,
            "term": term,
            "sort_by": "best_match",
            "limit": 12
        }
        r = requests.get(url, params=params, headers=headers)

        return r.json()

