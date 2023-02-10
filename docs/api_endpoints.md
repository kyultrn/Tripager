#### LOG IN PAGE
#### Log in

* Endpoint path: /login
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

* Endpoint path: /login
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
          "first_name": string,
          "last_name": string,
          "email": string,
          "pass_word": string
        }
      ]
    }
    ```

#### TRIP MANAGER PAGE
#### List trips

* Endpoint path: /trips
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
          "start_date": string,
          "end_date": string,
        }
      ]
    }
    ```
#### Create trip

* Endpoint path: /trips
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
            "start_date": string,
            "end_date": string
            }
        ]
        }
    ```
#### Update trip

* Endpoint path: /trips/{id}
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
            "start_date": string,
            "end_date": string
            }
        ]
        }
    ```
#### Delete trip

* Endpoint path: /trips/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


#### ABOUT THIS TRIP PAGE
#### Show all events

* Endpoint path: /trips/{id}/events
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
          "start_time": string,
          "end_time": string,
          "picture_url": string
        }
      ]
    }
    ```
#### See event details

* Endpoint path: /trips/{id}/event/{id}
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
          "start_time": string,
          "end_time": string,
          "picture_url": string
        }
      ]
    }
    ```
#### Update event

* Endpoint path: /trips/{id}/event/{id}
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
          "start_time": string,
          "end_time": string,
          "picture_url": string
        }
      ]
    }
    ```
#### Delete event
* Endpoint path: /trips/{id}/event/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


#### THINGS TO DO

* Endpoint path: https://api.yelp.com/v3/businesses/search

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
#### Line 245 Reassess
