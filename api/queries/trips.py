from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    name: str
    city: str
    state: str
    start_date: date
    end_date: date
    account_id: int

class TripOut(TripIn):
    id: int


class TripQueries:

    def create(self, trip: TripIn) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        '''
                        INSERT INTO trips
                                (name, city, state, start_date, end_date, account_id)
                        VALUES
                                (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        ''',
                        [
                                trip.name,
                                trip.city,
                                trip.state,
                                trip.start_date,
                                trip.end_date,
                                trip.account_id
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = trip.dict()
                    return TripOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Couldn't create trip!"}


    def get_all_trips(self) -> Union[Error, List[TripOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name, city, state, start_date, end_date, account_id
                        FROM trips
                        ORDER BY start_date;
                        """,
                    )
                    result = []
                    for record in db:
                        trip = TripOut(
                            id=record[0],
                            name=record[1],
                            city=record[2],
                            state=record[3],
                            start_date=record[4],
                            end_date=record[5],
                            account_id=record[6],
                        )
                        result.append(trip)
                    return result
        except Exception as e:
            print(e)
            return({"message": "Could not get trip data!"})

    def get_trips_by_id(self, account_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name, city, state, start_date, end_date, account_id
                        FROM trips
                        WHERE account_id = %s
                        ORDER BY start_date;
                        """,
                        [account_id],
                    )
                    result = []
                    for record in db:
                        trip = TripOut(
                            id=record[0],
                            name=record[1],
                            city=record[2],
                            state=record[3],
                            start_date=record[4],
                            end_date=record[5],
                            account_id=record[6],
                        )
                        result.append(trip)
                    return result
        except Exception as e:
            print(e)
            return({"message": "Could not get trip data!"})

    def get_trip(self, trip_id: int) -> Optional[TripOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name, city, state, start_date, end_date
                        FROM trips
                        WHERE id = %s;
                        """,
                        [trip_id]
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.record_to_trip_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that trip"}


    def update_trip(self, trip_id: int, trip: TripIn) -> Union[TripOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor()as db:
                    db.execute(
                        """
                        UPDATE trips
                        SET name = %s
                        , city = %s
                        , state = %s
                        , start_date = %s
                        , end_date = %s
                        WHERE id = %s
                        """,
                        [
                            trip.name,
                            trip.city,
                            trip.state,
                            trip.start_date,
                            trip.end_date,
                            trip_id
                        ]
                    )
                    return self.trip_in_to_out(trip_id, trip)
        except Exception as e:
            print(e)
            return {"message": "Could not update that trip."}


    def delete_trip(self, trip_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM trips
                        WHERE id = %s
                        """,
                        [trip_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def trip_in_to_out(self, id: int, trip: TripIn):
        old_data = trip.dict()
        return TripOut(id=id, **old_data)


    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            name=record[1],
            city=record[2],
            state=record[3],
            start_date=record[4],
            end_date=record[5],
        )
