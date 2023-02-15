from fastapi import APIRouter, Depends, Response, HTTPException, Request, status
from typing import Union, List, Optional
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel

from queries.accounts import(
    Error,
    AccountIn,
    AccountQueries,
    AccountOut,
    DuplicateAccountError,
)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.hashed_password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())



@router.get("/accounts", response_model=List[AccountOut])
def get_all(
    repo: AccountQueries = Depends(),
):
    return repo.get_all()


@router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountQueries = Depends(),
) -> Union[Error, AccountOut]:
    return repo.update(account_id, account)

@router.delete("/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id: int,
    repo: AccountQueries = Depends(),
) -> bool:
    return repo.delete(account_id)

@router.get("/accounts/{account_id}", response_model=Optional[AccountOut])
def get_one_account(
    account_id: int,
    response: Response,
    repo: AccountQueries = Depends(),
) -> AccountOut:
    account = repo.get_one(account_id)
    if account is None:
        response.status_code = 404
    return account
