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
from pydantic import BaseModel
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
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

@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
        print(account)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())















# from fastapi import APIRouter, Depends, Response
# from typing import Union, List
# from queries.accounts import(
#     Error,
#     AccountIn,
#     AccountRepository,
#     AccountOut,
# )

# router = APIRouter()

# @router.post("/accounts", response_model=Union[AccountOut, Error])
# def create_account(
#     account: AccountIn,
#     response: Response,
#     repo: AccountRepository = Depends(),
# ):
#     response.status_code = 400
#     return repo.create(account)


# @router.get("/accounts", response_model=List[AccountOut])
# def get_all(
#     repo: AccountRepository = Depends(),
# ):
#     return repo.get_all()


# @router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
# def update_account(
#     account_id: int,
#     account: AccountIn,
#     repo: AccountRepository = Depends(),
# ) -> Union[Error, AccountOut]:
#     return repo.update(account_id, account)



# @router.delete("/accounts/{account_id}", response_model=Union[bool, Error])
# def delete_account(
#     account_id: int,
#     repo: AccountRepository = Depends(),
# ) -> Union[bool, Error]:
#     result = repo.delete(account_id)
#     if result:
#         return True
#     else:
#         return {"message": "Could not delete account"}
