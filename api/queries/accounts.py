# from pydantic import BaseModel

# class DuplicateAccountError(ValueError):
#     pass


# class AccountIn(BaseModel):
#     full_name: str
#     password: str
#     email: str

# class AccountOut(BaseModel):
#     id: str
#     email: str
#     full_name: str


# class AccountOutWithPassword(AccountOut):
#     hashed_password: str


# class AccountQueries(Queries): #not set up yet pool.py or something in there


#     def get(self, email: str) -> AccountOutWithPassword:

#     def create(self, info: AccountIn, hashed_password: str) -> AccountOut
