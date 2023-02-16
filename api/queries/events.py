from pydantic import BaseModel
from datetime import time
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    name: str
    description: str
    location: Optional[str]
    start_time: time
    end_time: time
    picture_url: Optional[str]
    trip_id: int


class EventOut(EventIn):
    id: int


class EventQueries:

    def create(self, event: EventIn) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        '''
                        INSERT INTO events
                                (name, description, location, start_time, end_time, picture_url, trip_id)
                        VALUES
                                (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        ''',
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
                    id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventOut(id=id, **old_data)

        except Exception as e:
            print(e)
            return {"message": "Couldn't create event!"}


    # def get_all_events(self) -> Union[Error, List[eventOut]]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     SELECT id, name, city, state, start_date, end_date
    #                     FROM events
    #                     ORDER BY start_date;
    #                     """,
    #                 )
    #                 result = []
    #                 for record in db:
    #                     event = eventOut(
    #                         id=record[0],
    #                         name=record[1],
    #                         city=record[2],
    #                         state=record[3],
    #                         start_date=record[4],
    #                         end_date=record[5],
    #                     )

    #                     result.append(event)
    #                 return result

    #     except Exception as e:
    #         print(e)
    #         return({"message": "Could not get event data!"})

    # def get_event(self, event_id: int) -> Optional[eventOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     SELECT id, name, city, state, start_date, end_date
    #                     FROM events
    #                     WHERE id = %s;
    #                     """,
    #                     [event_id]
    #                 )
    #                 record = db.fetchone()
    #                 if record is None:
    #                     return None
    #                 return self.record_to_event_out(record)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not get that event"}


    # def update_event(self, event_id: int, event: eventIn) -> Union[eventOut, Error]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor()as db:
    #                 db.execute(
    #                     """
    #                     UPDATE events
    #                     SET name = %s
    #                     , city = %s
    #                     , state = %s
    #                     , start_date = %s
    #                     , end_date = %s
    #                     WHERE id = %s
    #                     """,
    #                     [
    #                         event.name,
    #                         event.city,
    #                         event.state,
    #                         event.start_date,
    #                         event.end_date,
    #                         event_id
    #                     ]
    #                 )
    #                 return self.event_in_to_out(event_id, event)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not update that event."}


    # def delete_event(self, event_id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM events
    #                     WHERE id = %s
    #                     """,
    #                     [event_id]
    #                 )
    #                 return True
    #     except Exception as e:
    #         print(e)
    #         return False


    # def event_in_to_out(self, id: int, event: eventIn):
    #     old_data = event.dict()
    #     return eventOut(id=id, **old_data)


    # def record_to_event_out(self, record):
    #     return eventOut(
    #         id=record[0],
    #         name=record[1],
    #         city=record[2],
    #         state=record[3],
    #         start_date=record[4],
    #         end_date=record[5],
    #     )