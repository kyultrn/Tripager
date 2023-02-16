from pydantic import BaseModel
from datetime import time
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    name: str
    description: str
    location: str
    start_time: time
    end_time: time
    picture_url: str
    trip_id: int

class EventOut(BaseModel):
    id: int
    name: str
    description: str
    location: str
    start_time: time
    end_time: time
    picture_url: str
    trip_id: int

class EventQueries:

    def create(self, event: EventIn) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO events
                                (name, description, location, start_time, end_time, picture_url, trip_id)
                        VALUES
                                (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                                event.name,
                                event.description,
                                event.location,
                                event.start_time,
                                event.end_time,
                                event.picture_url,
                                event.trip_id

                        ],
                    )
                    id = db.fetchone()[0]
                    old_data = event.dict()
                    return EventOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Couldn't create event"}


    def get_trip_events(self, trip_id: int) -> Union[Error, List[EventOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name, description, location, start_time, end_time, picture_url, trip_id
                        FROM events
                        WHERE trip_id = %s AND id = %s
                        ORDER BY name;
                        """,
                        [trip_id]
                    )
                    result = []
                    for record in db:
                        event = EventOut(
                            id=record[0],
                            name=record[1],
                            description=record[2],
                            location=record[3],
                            start_time=record[4],
                            end_time=record[5],
                            picture_url=record[6],
                            trip_id=record[7],
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return({"message": "Could not grab all events under that trip"})
