import psycopg2
from psycopg2 import sql
import fetchloans


class InvestmentStrategy:
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

        # Create an investment_strategies table if not exists
        create_table_query = """
        CREATE TABLE IF NOT EXISTS investment_strategies (
            id SERIAL PRIMARY KEY,
            risk_level VARCHAR(50),
            target_return DECIMAL(5, 2),
            allocation_fixed_income DECIMAL(5, 2),
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        self.cursor.execute(create_table_query)
        self.connection.commit()

# //intial saving feature
    def basic_feature(income, avg_expenses, goal, time):
    # """Basic feature calculation.
    # Args:
    #     income (float): Monthly income.
    #     avg_expenses (float): Average monthly expenses.
    #     goal (float): Desired savings goal.
    #     time (float): Desired time to reach goal.
    # Returns:
    #     float: Basic feature calculation.
    # """

        if (goal / time > income - avg_expenses):
            print("You are not saving enough to reach your goal in the given time.")
            can_save = int(input("How much can you save per month? "))
            return can_save

        else:
            print(f"You need to save {goal / time} per month to reach your goal in the given time.")


    def generatePlan(self, risk_level, target_return, allocation_fixed_income,time_frame):
        #50 EQity,30 20,
        # Create investment plans based on user data and insert into the database
        insert_query = sql.SQL("INSERT INTO investment_strategies (risk_level, target_return, allocation_fixed_income,time_frame) VALUES ({}, {}, {},{});").format(
            sql.Literal(risk_level),
            sql.Literal(float(target_return)),
            sql.Literal(float(allocation_fixed_income))
        )
        self.cursor.execute(insert_query)
        self.connection.commit()
        print(f"Investment plan '{plan_name}' created for {self.username}.")

    
            

    def updatePlan(self, plan_id, target_return, allocation_equity, allocation_fixed_income):
        # Modify existing investment plans in the database
        update_query = sql.SQL("UPDATE investment_strategies SET target_return = {}, allocation_equity = {}, allocation_fixed_income = {} WHERE id = {} AND username = {};").format(
            sql.Literal(float(target_return)),
            sql.Literal(float(allocation_equity)),
            sql.Literal(float(allocation_fixed_income)),
            sql.Literal(plan_id),
            sql.Literal(self.username)
        )
        self.cursor.execute(update_query)
        self.connection.commit()
        print(f"Investment plan with ID {plan_id} updated for {self.username}.")

    def getPlanDetails(self, plan_id):
        # Retrieve details of a specific investment plan from the database
        select_query = sql.SQL("SELECT * FROM investment_strategies WHERE id = {} AND username = {};").format(
            sql.Literal(plan_id),
            sql.Literal(self.username)
        )
        self.cursor.execute(select_query)
        plan_details = self.cursor.fetchone()

        if plan_details:
            print(f"Plan Details for ID {plan_id} ({self.username}):")
            print(f"Plan Name: {plan_details[2]}")
            print(f"Risk Level: {plan_details[3]}")
            print(f"Target Return: {plan_details[4]:.2f}%")
            print(f"Allocation - Equity: {plan_details[5]:.2f}%")
            print(f"Allocation - Fixed Income: {plan_details[6]:.2f}%")
        else:
            print(f"No plan found with ID {plan_id} for {self.username}.")

    def __del__(self):
        # Close the database connection when the object is deleted
        self.cursor.close()
        self.connection.close()


