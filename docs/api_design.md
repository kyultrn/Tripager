#### ACCOUNTS
#### Log in
* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * email: string
  * password: string

* Response: Account information
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```
#### Log out
* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```
#### Sign up
* Endpoint path: /accounts
* Endpoint method: POST

* Response: Account information
* Response shape:
    ```json
    {
      "account": [
        {
          "name": string,
          "email": string,
          "password": string
        }
      ]
    }
    ```

#### TRIP MANAGER
Creating a new trip saves the name, city, state, start date and end date of a trip to the database. Trips can updated or deleted. When a trip is deleted, all events associated with that trip are also deleted.
#### List trips

* Endpoint path: /api/trips
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: List of trips
* Response shape:
    ```json
    {
      "trips": [
        {
          "name": string,
          "city": string,
          "state": string,
          "start_date": date,
          "end_date": date
        }
      ]
    }
    ```
#### Create trip

* Endpoint path: /api/trips
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Response: Trip information
* Response shape:
    ```json
        {
        "trip": [
            {
            "name": string,
            "city": string,
            "state": string,
            "start_date": date,
            "end_date": date
            }
        ]
        }
    ```
#### Update trip

* Endpoint path: /api/trips/{trip_id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response: Trip information
* Response shape:
    ```json
        {
        "trip": [
            {
            "name": string,
            "city": string,
            "state": string,
            "start_date": date,
            "end_date": date
            }
        ]
        }
    ```
#### Delete trip

* Endpoint path: /api/trips/{trip_id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


#### EVENTS MANAGER
Creating a new event saves the name, description, location, date, start time, end time, picture url and trip id to the database. Events can updated or deleted. When a trip is deleted, all events associated with that trip are also deleted.
#### Show all trip's events

* Endpoint path: /api/trips/{trip_id}/events
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: List of events
* Response shape:
    ```json
    {
      "events": [
        {
          "name": string,
          "description": string,
          "location": string,
          "date": date,
          "start_time": time,
          "end_time": time,
          "picture_url": string,
          "trip_id": int
        }
      ]
    }
    ```
#### See event details

* Endpoint path: /api/trips/{trip_id}/events/{event_id}
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Event information
* Response shape:
    ```json
    {
      "event": [
        {
          "name": string,
          "description": string,
          "location": string,
          "date": date,
          "start_time": time,
          "end_time": time,
          "picture_url": string,
          "trip_id": int
        }
      ]
    }
    ```
#### Update event

* Endpoint path: /api/trips/{trip_id}/events/{event_id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response: Event information
* Response shape:
    ```json
    {
      "event": [
        {
          "name": string,
          "description": string,
          "location": string,
          "date": date,
          "start_time": time,
          "end_time": time,
          "picture_url": string,
          "trip_id": int
        }
      ]
    }
    ```
#### Delete event
* Endpoint path: /api/trips/{trip_id}/events/{event_id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


#### THINGS TO DO
On the Things To Do page, users can search activities, businesses, etc using the Yelp API. Users will see details about 12 businesses at once. If a user is logged in, they have the ability to select one of the businesses, and create an event, using the details of one of the businesses. Logged in users, and non-logged in users, can click a "Get details" button and be re-directed to Yelp for additional details about the business.

* Endpoint path: /api/businesses

* Endpoint method: GET

* Response: Yelp API info
* Response shape:
    ```json
        {
            "businesses": [
                {
                "rating": int,
                "price": string,
                "phone": string,
                "review_count": int,
                "name": string,
                "url": string,
                "image_url": string,
                "location": {
                    "city": string,
                    "address2": string,
                    "address3": string,
                    "state": string,
                    "address1": string,
                    "zip_code": string
                }
                },
                // ...
            ]
        }
