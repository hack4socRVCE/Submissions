import psycopg2
from psycopg2 import sql

class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
        self.is_authenticated = False

        # Establish a connection to the PostgreSQL database
        self.connection = psycopg2.connect(
            user="your_username",
            password="your_password",
            host="your_host",
            port="your_port",
            database="your_database"
        )
        self.cursor = self.connection.cursor()

    def registerUser(self):
        # Perform user registration logic and insert into the database
        insert_query = sql.SQL("INSERT INTO users (username, password, email) VALUES ({}, {}, {});").format(
            sql.Literal(self.username),
            sql.Literal(self.password),
            sql.Literal(self.email)
        )
        self.cursor.execute(insert_query)
        self.connection.commit()
        print(f"User {self.username} registered successfully.")

    def login(self, entered_password):
        # Fetch user data from the database and check if the entered password is correct
        select_query = sql.SQL("SELECT * FROM users WHERE username = {};").format(sql.Literal(self.username))
        self.cursor.execute(select_query)
        user_data = self.cursor.fetchone()

        if user_data and entered_password == user_data[2]:  # Assuming password is at index 2 in the database
            self.is_authenticated = True
            print(f"User {self.username} logged in successfully.")
        else:
            print("Login failed. Incorrect password.")

    def updateProfile(self, new_email):
        # Update user profile logic and update the database
        update_query = sql.SQL("UPDATE users SET email = {} WHERE username = {};").format(
            sql.Literal(new_email),
            sql.Literal(self.username)
        )
        self.cursor.execute(update_query)
        self.connection.commit()
        print(f"User {self.username}'s profile updated successfully.")

    def deleteUser(self):
        # Perform user deletion logic and delete from the database
        delete_query = sql.SQL("DELETE FROM users WHERE username = {};").format(sql.Literal(self.username))
        self.cursor.execute(delete_query)
        self.connection.commit()
        print(f"User {self.username} deleted successfully.")

    def __del__(self):
        # Close the database connection when the object is deleted
        self.cursor.close()
        self.connection.close()  