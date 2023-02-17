steps=[
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            hashed_password VARCHAR(250) NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """
    ]
]
