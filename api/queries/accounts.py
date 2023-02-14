from pydantic import BaseModel

class AccountIn(BaseModel):
    name: str
    email: str
    password: str
