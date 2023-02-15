from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional

class DuplicateAccountError(ValueError):
    pass
from typing import List, Union, Optional

# class Error(BaseModel):
#     message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    name: str
    password: str
    email: str


class AccountOut(BaseModel):
    id: str
    name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, email: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , email
                            , hashed_password
                        FROM accounts
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return AccountOutWithPassword(
                        id=record[0],
                        name=record[1],
                        email=record[2],
                        hashed_password=record[3],
                    )
        except Exception:
            return {"message": "Couldn't find account"}


    def create(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (name, email, hashed_password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.name,
                            account.email,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    print("******", id)
                    old_data = account.dict()
                    print(old_data)
                    return AccountOutWithPassword(
                        id=id,
                        hashed_password=hashed_password,
                        **old_data,
                    )
        except Exception:
            return {"message": "Couldn't create user"}




# class AccountRepository:
    # def update(self, account_id: int, account: AccountIn) -> Union[AccountOut, Error]:
    #     try:
    #         # Connect to the database
    #         with pool.connection() as conn:
    #             # Get a cursor [something to run SQL with]
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     UPDATE accounts
    #                     SET name = %s
    #                     , email = %s
    #                     , password = %s
    #                     WHERE id = %s
    #                     """,
    #                     [
    #                         account.name,
    #                         account.email,
    #                         account.password,
    #                         account_id
    #                     ]
    #                 )
    #                 # old_data = account.dict()
    #                 return self.account_in_to_out(account_id, account)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not update account"}

    # def get_all(self) -> Union[Error, List[AccountOut]]:
    #     try:
    #         # Connect to the database
    #         with pool.connection() as conn:
    #             # Get a cursor [something to run SQL with]
    #             with conn.cursor() as db:
    #                 # Run our SELECT statement
    #                 result = db.execute(
    #                     """
    #                     SELECT id, name, email, password
    #                     FROM accounts
    #                     ORDER BY id;
    #                     """
    #                 )
    #                 result = []
    #                 for record in db:
    #                     account = AccountOut(
    #                         id=record[0],
    #                         name=record[1],
    #                         email=record[2],
    #                         password=record[3]
    #                     )
    #                     result.append(account)
    #                 return result
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not receive all accounts"}


    # def create(self, account: AccountIn) -> AccountOut:
    #     try:
    #         # Connect to the database
    #         with pool.connection() as conn:
    #             # Get a cursor [something to run SQL with]
    #             with conn.cursor() as db:
    #                 # Run our INSERT statement
    #                 result = db.execute(
    #                     """
    #                     INSERT INTO accounts
    #                         (name, email, password)
    #                     VALUES
    #                         (%s, %s, %s)
    #                     RETURNING ID;
    #                     """,
    #                     [
    #                         account.name,
    #                         account.email,
    #                         account.password
    #                     ]
    #                 )
    #                 id = result.fetchone()[0]
    #                 # Return new data
    #                 # old_data = account.dict()
    #                 # return AccountOut(id=id, **old_data)
    #                 return self.account_in_to_out(id, account)
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not create account"}

    # def account_in_to_out(self, id: int, account: AccountIn):
    #     old_data = account.dict()
    #     return AccountOut(id=id, **old_data)

    # def delete(self, account_id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM accounts
    #                     WHERE id = %s
    #                     """,
    #                     [account_id]
    #                 )
    #                 return True
    #     except Exception as e:
    #         print(e)
    #         return False
