import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from psycopg2 import sql

class FinancesDB():
    params = {
        "user": "postgres",
        "password": "hack4soc",
        "host": "localhost",
        "port": "5432"
    }
    @classmethod
    def create_table():
    # Connection parameEters - replace these with your actual database credentials
        conn = psycopg2.connect(
            dbname='postgres', 
            user='postgres', 
            password='hack4soc', 
            host='localhost'
        )
    cur = conn.cursor()

    # SQL statement to create a table
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS finances (
        id SERIAL PRIMARY KEY,
        income DECIMAL(10, 2),
        expense DECIMAL(10, 2),
        goal VARCHAR(255),
        time VARCHAR(255),
        product VARCHAR(255)
    )
    '''


    def create_table(cls):
        
        try:
            cls.cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            Expense VARCHAR(100),
            Income INT,
            time INT,
            goal INT
            )
            """)
        except psycopg2.Error as e:
            print(f"Error creating table: {e}")

 

    @classmethod
    def insert_info(cls, Expense, Income, time, goal):
         
        try:
            query = """
                INSERT INTO users (Expense, Income, time, goal) VALUES (%s, %s, %s, %s)
            """
            cls.cur.execute(query, (Expense, Income, time, goal))
        except psycopg2.Error as e:
            print(f"Error inserting user: {e}")

    @classmethod
    def close_connection(cls):
        try:
            if cls.cur is not None: 
                cls.cur.close()
            if cls.conn is not None:
                cls.conn.close()
            print('Connection closed')
        except psycopg2.Error as e:
            print(f"Error closing connection: {e}")