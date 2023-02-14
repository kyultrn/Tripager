steps=[
    [
        ## Create the table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(50) NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE accounts;
        """
    ]
]
