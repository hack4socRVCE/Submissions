import matplotlib.pyplot as plt
import numpy as np

# Define the interest rates from 1% to 15%
interest_rates = np.linspace(1, 15, 15)

# Calculate the required profit for borrowing $6300 and $6500 at each interest rate
required_profit_6300 = [(6300 * (1 + r/100) + 1500) - 6500 for r in interest_rates]
required_profit_6500 = [(6500 * (1 + r/100) + 1500) - 6700 for r in interest_rates]

# Plot the graph
plt.figure(figsize=(10, 6))
plt.plot(interest_rates, required_profit_6300, label='Borrowing $6300', marker='o')
plt.plot(interest_rates, required_profit_6500, label='Borrowing $6500', marker='x')

# Label the graph
plt.title('Required Profit from Stock Investment at Various Interest Rates')
plt.xlabel('Interest Rate (%)')
plt.ylabel('Required Profit ($)')
plt.legend()
plt.grid(True)
plt.show()