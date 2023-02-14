from fastapi import APIRouter
from queries.accounts import AccountIn

router = APIRouter()

@router.post("/accounts")
def create_account(account: AccountIn):
    print('account', account)
    return account
