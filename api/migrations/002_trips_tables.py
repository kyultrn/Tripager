steps = [
    [
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE trips;
        """
    ]
]
