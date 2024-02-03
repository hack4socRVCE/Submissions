
def basic_feature(income, avg_expenses, goal, time):
    """Basic feature calculation.

    Args:
        income (float): Monthly income.
        avg_expenses (float): Average monthly expenses.
        goal (float): Desired savings goal.
        time (float): Desired time to reach goal.

    Returns:
        float: Basic feature calculation.
    """
    ideal_savings = goal / time
    actual_savings = income - avg_expenses
    to_save = ideal_savings - actual_savings
    to_save_percent = (to_save * 100) / actual_savings # wrt to actual savings, if actual savings is 100, and to_save is 20, then 20% more is needed
    to_make_percent = 20 # 20 is fixed, i.e, he sure shot need to make this % of his investment, based on this number is all the other calculations are done
    loan_amount = ((to_save * 100) / to_make_percent) - actual_savings
    min_interest = 5
    make_percent = min_interest + to_make_percent
    total_investment = loan_amount + actual_savings
    interest_amount = loan_amount * (min_interest / 100)
    total_repayment = loan_amount + interest_amount
    total_profit = to_save + interest_amount

    fixed_return_as = (actual_savings * 20) / 100

    if (ideal_savings > actual_savings and to_save_percent > 20):
        print(f"""You need to save {round(ideal_savings, 2)} per month to reach your goal in the given time.\n
              That is {round(to_save, 2)} or {round(to_save_percent)}% more than you are currently saving.\n
              You can borrow {round(loan_amount, 2)} at {min_interest}% interest (per month) to reach your goal in the given time.""")
        print(f"""So here is the Breakdown: \n
              • Borrowed Amount: {round(loan_amount, 2)}\n
              • Interest Rate: {min_interest}%\n
              • Interest Amount: {min_interest}% of {round(loan_amount, 2)} = {round(interest_amount, 2)}\n
              • Time: {time} month(s)\n
              • Actual Savings: {actual_savings}\n
              • Ideal Savings: {round(ideal_savings, 2)}\n
              • Extra to be saved: {round(to_save, 2)}\n
              • Total Investement: {round(loan_amount, 2)} + {actual_savings} = {round(total_investment, 2)}\n
              • Total Repayment (Principal + Interest): {round(loan_amount, 2)} + {round(interest_amount, 2)} = {round(total_repayment, 2)}\n""")
        print(f"""Stocks which gives you a profit of {round(ideal_savings, 2)} or {to_make_percent}% of {round(total_investment, 2)} + {round(interest_amount, 2)} or {min_interest}% of {round(loan_amount, 2)}, so the overall profit should be {round(total_profit, 2)} that is {round(make_percent, 2)}% of {round(total_investment, 2)} are:\n
              • Apple Inc. (AAPL)\n
              • Microsoft Corporation (MSFT)\n
              • Amazon.com Inc. (AMZN)\n
              • Alphabet Inc. (GOOGL)\n""")

    elif(ideal_savings > actual_savings and to_save_percent <= 20 ):
        print(f"""You need to save {round(ideal_savings, 2)} per month to reach your goal in the given time.\n
            That is {round(to_save, 2)} or {round(to_save_percent)}% more than you are currently saving.\n
            Stocks which gives you a profit of {round(to_make_percent, 2)}% of {round(actual_savings, 2)} which makes the total savings per month to be {actual_savings + ((actual_savings * 20) / 100)} are:\n
            • Apple Inc. (AAPL)\n
            • Microsoft Corporation (MSFT)\n
            • Amazon.com Inc. (AMZN)\n
            • Alphabet Inc. (GOOGL)\n""") 
    else:
        print(f"{round(ideal_savings, 2)}")

        



income = int(input("What is your monthly income? "))
avg_expenses = int(input("What is your average monthly expenses? "))
goal = int(input("What is your desired savings goal? "))
time = int(input("In how many months do you want to reach your goal? "))
can_save = basic_feature(income, avg_expenses, goal, time)