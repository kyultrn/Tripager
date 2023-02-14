from pydantic import BaseModel
from queries.pool import pool

class AccountIn(BaseModel):
    name: str
    password: str
    email: str

class AccountOut(BaseModel):
    id: str
    name: str
    password: str
    email: str

class AccountRepository:
    def create(self, account: AccountIn) -> AccountOut:
        # Connect to the database
        with pool.connection() as conn:
            # Get a cursor [something to run SQL with]
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (name, email, password)
                    VALUES
                        (%s, %s, %s)
                    RETURNING ID;
                    """,
                    [
                        account.name,
                        account.email,
                        account.password
                    ]
                )
                id = result.fetchone()[0]
                # Return new data
                old_data = account.dict()
                return AccountOut(id=id, **old_data)




# class DuplicateAccountError(ValueError):
#     pass

class AccountOutWithPassword(AccountOut):
    hashed_password: str


# class AccountQueries(Queries): #not set up yet pool.py or something in there


#     def get(self, email: str) -> AccountOutWithPassword:

#     def create(self, info: AccountIn, hashed_password: str) -> AccountOut
