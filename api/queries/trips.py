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

class TripOut(BaseModel):
    id: int
    name: str
    city: str
    state: str
    start_date: date
    end_date: date


class TripQueries:
    def create(self, trip: TripIn) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        '''
                        INSERT INTO trips
                                (name, city, state, start_date, end_date)
                        VALUES
                                (%s, %s, %s, %s, %s)
                        RETURNING id;
                        ''',
                        [
                                trip.name,
                                trip.city,
                                trip.state,
                                trip.start_date,
                                trip.end_date
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
                    result = db.execute(
                        """
                        SELECT id, name, city, state, start_date, end_date
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
                        )

                        result.append(trip)
                    return result


        except Exception as e:
            print(e)
            return({"message": "Could not get trip data!"})

    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            name=record[1],
            city=record[2],
            state=record[3],
            start_date=record[4],
            end_date=record[5],
        )


    def get_trip(self, trip_id: int) -> Optional[TripOut]:
        try:
            with pool.connection() as conn:
                print("TEST!!!!!!")
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
                    print(record)
                if record is None:
                    return None
                return self.record_to_trip_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that trip"}
