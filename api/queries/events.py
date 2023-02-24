from pydantic import BaseModel
from datetime import time, date
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    name: str
    description: str
    location: Optional[str]
    date: date
    start_time: time
    end_time: time
    picture_url: Optional[str]


class EventOut(EventIn):
    id: int
    trip_id: int


class EventQueries:

    def create_trip_event(self, event: EventIn, trip_id: int) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        '''
                        INSERT INTO events
                                (name,
                                description,
                                location, date,
                                start_time, end_time,
                                picture_url, trip_id)
                        VALUES
                                (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        ''',
                        [
                                event.name,
                                event.description,
                                event.location,
                                event.date,
                                event.start_time,
                                event.end_time,
                                event.picture_url,
                                trip_id
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventOut(id=id, trip_id=trip_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Couldn't create trip event."}

    def get_all_trip_events(self,
                            trip_id: int
                            ) -> Union[Error, List[EventOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                        name,
                        description,
                        location,
                        date,
                        start_time,
                        end_time,
                        picture_url,
                        trip_id
                        FROM events
                        WHERE trip_id = %s
                        ORDER BY date, start_time;
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
                            date=record[4],
                            start_time=record[5],
                            end_time=record[6],
                            picture_url=record[7],
                            trip_id=record[8]
                        )
                        result.append(event)
                    return result

        except Exception as e:
            print(e)
            return ({"message": "Could not retrieve all trip's events."})

    def get_trip_event(self,
                       trip_id: int,
                       event_id: int
                       ) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                        name,
                        description,
                        location,
                        date,
                        start_time,
                        end_time,
                        picture_url,
                        trip_id
                        FROM events
                        WHERE trip_id = %s AND id = %s;
                        """,
                        [trip_id, event_id]
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.record_to_event_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve that trip's event."}


    def update_trip_event(self, trip_id: int, event_id: int, event: EventIn) -> Union[EventOut, Error]:
            try:
                with pool.connection() as conn:
                    with conn.cursor()as db:
                        db.execute(
                            """
                            UPDATE events
                            SET name = %s
                            , description = %s
                            , location = %s
                            , date = %s
                            , start_time = %s
                            , end_time = %s
                            , picture_url = %s
                            WHERE trip_id = %s AND id = %s;
                            """,
                            [
                                event.name,
                                event.description,
                                event.location,
                                event.date,
                                event.start_time,
                                event.end_time,
                                event.picture_url,
                                event_id,
                                trip_id
                            ]
                        )
                        return self.event_in_to_out(event_id, trip_id, event)
            except Exception as e:
                print(e)
                return {"message": "Could not update that trip's event."}

    def delete_trip_event(self, id: int, trip_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s AND trip_id = %s;
                        """,
                        [id, trip_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def event_in_to_out(self, id: int, trip_id: int, event: EventIn):
        old_data = event.dict()
        return EventOut(id=id, trip_id=trip_id, **old_data)


    def record_to_event_out(self, record):
        return EventOut(
            id=record[0],
            name=record[1],
            description=record[2],
            location=record[3],
            date=record[4],
            start_time=record[5],
            end_time=record[6],
            picture_url=record[7],
            trip_id=record[8]
        )
