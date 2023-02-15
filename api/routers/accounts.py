from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.accounts import(
    Error,
    AccountIn,
    AccountRepository,
    AccountOut,
)

router = APIRouter()

@router.post("/accounts", response_model=Union[AccountOut, Error])
def create_account(
    account: AccountIn,
    response: Response,
    repo: AccountRepository = Depends(),
):
    response.status_code = 400
    return repo.create(account)


@router.get("/accounts", response_model=List[AccountOut])
def get_all(
    repo: AccountRepository = Depends(),
):
    return repo.get_all()


@router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountRepository = Depends(),
) -> Union[Error, AccountOut]:
    return repo.update(account_id, account)
