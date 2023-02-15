from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union

# class DuplicateAccountError(ValueError):
#     pass

class Error(BaseModel):
    message: str

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
    def update(self, account_id: int, account: AccountIn) -> Union[AccountOut, Error]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor [something to run SQL with]
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET name = %s
                        , email = %s
                        , password = %s
                        WHERE id = %s
                        """,
                        [
                            account.name,
                            account.email,
                            account.password,
                            account_id
                        ]
                    )
                    # old_data = account.dict()
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update account"}

    def get_all(self) -> Union[Error, List[AccountOut]]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor [something to run SQL with]
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, name, email, password
                        FROM accounts
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        account = AccountOut(
                            id=record[0],
                            name=record[1],
                            email=record[2],
                            password=record[3]
                        )
                        result.append(account)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not receive all accounts"}


    def create(self, account: AccountIn) -> AccountOut:
        try:
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
                    # old_data = account.dict()
                    # return AccountOut(id=id, **old_data)
                    return self.account_in_to_out(id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not create account"}

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def delete(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

class AccountOutWithPassword(AccountOut):
    hashed_password: str


# class AccountQueries(Queries): #not set up yet pool.py or something in there


#     def get(self, email: str) -> AccountOutWithPassword:

#     def create(self, info: AccountIn, hashed_password: str) -> AccountOut
