from api.testclient import TestClient
from main import app
from ../queries/accounts import AccountQueries
client = TestClient(app)

class FakeAccountQueries:
    def get_accounts(self):
        return []
    def get_account(self, account_id: int):
        return {
            'id': account_id,
            "email":
        }


def test_get_accounts():
    # Arrange
    app.dependency_overrides[AccountQueries] = FakeAccountQueries
    # Act
    res = client.get('/api/accounts')
    # Assert
    assert data['accounts'] == []
    assert res.status_code == 200

def test_get_account():
    app.dependency_overrides[AccountQueries] = FakeAccountQueries

    res = client.get('/accounts')
