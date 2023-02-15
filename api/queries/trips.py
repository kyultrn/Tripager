from pydantic import BaseModel
from datetime import date
from queries.pool import pool



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
                    ]
                    )
                    id = result.fetchone()[0]
                    old_data = trip.dict()
                    return TripOut(id=id, **old_data)

        except Exception as e:
            print(e)
            return {"message": "Couldn't create trip!"}
