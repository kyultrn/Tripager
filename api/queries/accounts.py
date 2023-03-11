from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


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

    def create(self,
               account: AccountIn,
               hashed_password: str
               ) -> AccountOutWithPassword:
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
                    old_data = account.dict()
                    return AccountOutWithPassword(
                        id=id,
                        hashed_password=hashed_password,
                        **old_data,
                    )
        except Exception:
            return {"message": "Couldn't create user"}

    def update(self,
               account_id: int,
               account: AccountIn,
               ) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET name = %s
                        , email = %s
                        , hashed_password = %s
                        WHERE id = %s
                        """,
                        [
                            account.name,
                            account.email,
                            account.password,
                            account_id
                        ]
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception:
            return {"message": "Could not update account"}

    def get_all(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, email, hashed_password
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
        except Exception:
            return {"message": "Could not receive all accounts"}

    def delete(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s;
                        """,
                        [account_id]
                    )
                    return True
        except Exception:
            return False

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)
