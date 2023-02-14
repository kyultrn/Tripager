from fastapi import APIRouter, Depends
from queries.accounts import AccountIn, AccountRepository

router = APIRouter()

@router.post("/accounts")
def create_account(
    account: AccountIn,
    repo: AccountRepository = Depends()
):
    return repo.create(account)
