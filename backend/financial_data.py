import psycopg2
from psycopg2 import sql

class FinancialData:
    def __init__(self, username):
        self.username = username

        # Establish a connection to the PostgreSQL database
        self.connection = psycopg2.connect(
            user="your_username",
            password="your_password",
            host="your_host",
            port="your_port",
            database="your_database"
        )
        self.cursor = self.connection.cursor()

        # Create a financial_data table if not exists
        create_table_query = """
        CREATE TABLE IF NOT EXISTS financial_data (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255),
            income DECIMAL(15, 2),
            expenses DECIMAL(15, 2),
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        self.cursor.execute(create_table_query)
        self.connection.commit()

    def addIncome(self, income_amount):
        # Record user income details in the database
        insert_query = sql.SQL("INSERT INTO financial_data (username, income) VALUES ({}, {});").format(
            sql.Literal(self.username),
            sql.Literal(float(income_amount))
        )
        self.cursor.execute(insert_query)
        self.connection.commit()
        print(f"Income recorded for {self.username}.")

    def addExpense(self, expense_amount):
        # Input user expenses in the database
        insert_query = sql.SQL("INSERT INTO financial_data (username,expenses) VALUES ({}, {});").format(
            sql.Literal(self.username),
            sql.Literal(float(expense_amount))
        )
        self.cursor.execute(insert_query)
        self.connection.commit()
        print(f"Expense recorded for {self.username}.")

    def getFinancialSummary(self):
        # Retrieve overall financial status from the database
        select_query = sql.SQL("SELECT SUM(income) AS total_income, SUM(expenses) AS total_expenses FROM financial_data WHERE username = {};").format(sql.Literal(self.username))
        self.cursor.execute(select_query)
        financial_summary = self.cursor.fetchone()

        total_income = financial_summary[0] if financial_summary[0] else 0.0
        total_expenses = financial_summary[1] if financial_summary[1] else 0.0
        balance = total_income - total_expenses

        print(f"Financial Summary for {self.username}:")
        print(f"Total Income: ${total_income:.2f}")
        print(f"Total Expenses: ${total_expenses:.2f}")
        print(f"Balance: ${balance:.2f}")

    def updateFinancialData(self, income_amount, expense_amount):
        # Modify existing financial records in the database
        update_query = sql.SQL("UPDATE financial_data SET income = income + {}, expenses = expenses + {} WHERE username = {};").format(
            sql.Literal(float(income_amount)),
            sql.Literal(float(expense_amount)),
            sql.Literal(self.username)
        )
        self.cursor.execute(update_query)
        self.connection.commit()
        print(f"Financial data updated for {self.username}.")

    def __del__(self):
        # Close the database connection when the object is deleted
        self.cursor.close()
        self.connection.close()

