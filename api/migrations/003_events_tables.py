steps = [
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
            trip_id INT NOT NULL REFERENCES trips(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE events;
        """
    ]
]
