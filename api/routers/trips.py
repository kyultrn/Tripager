from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from jwtdown_fastapi.authentication import Token
from authenticator import authenticator


from queries.trips import (
    TripIn,
    TripOut,
    TripQueries,
)

router = APIRouter()

@router.post("/trips", response_model=TripOut)
def create_trip(
    trip: TripIn,
    repo: TripQueries = Depends()
):
   return repo.create(trip)
