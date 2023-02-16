from fastapi import FastAPI
import os
from routers import accounts, trips, events
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(trips.router, tags=["Trips"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(events.router, tags=["Events"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }
