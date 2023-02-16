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
    ],
    [
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL
        );
        """,
        """
        DROP TABLE trips;
        """
    ]
]
