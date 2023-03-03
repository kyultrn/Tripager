steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL CHECK (name <> ''),
            email VARCHAR(255) NOT NULL CHECK (email <> ''),
            hashed_password VARCHAR(250) NOT NULL CHECK (hashed_password <> '')
        );
        """,
        """
        DROP TABLE accounts;
        """
    ]
]
