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
    ],
    [
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(1000),
            picture_url VARCHAR(500),
            location VARCHAR(255),
            date DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            trip_id INT NOT NULL REFERENCES trips(id)
        );
        """,
        """
        DROP TABLE events;
        """
    ]
]
