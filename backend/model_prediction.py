import yfinance as yf

# Fetch historical data for a stock (example: 'TATAMOTORS.NS' for Tata Motors on NSE)
data = yf.download('TATAMOTORS.NS', start='2023-01-01', end='2024-01-31')
data.tail()

# Example: Calculate the moving average
data['MA50'] = data['Close'].rolling(50).mean()
data = data.dropna()
data.tail()

# Example: Calculate the RSI
import numpy as np
delta = data['Close'].diff()
delta = delta[1:]
up = delta.copy()
down = delta.copy()
up[up<0] = 0
down[down>0] = 0
data['up'] = up
data['down'] = down
avg_gain = data['up'].rolling(window=14).mean()
avg_loss = abs(data['down'].rolling(window=14).mean())
rs = avg_gain/avg_loss
rsi = 100.0 - (100.0/(1.0+rs))
data['RSI'] = rsi
data = data.dropna()
data.tail()

# Example: Calculate the MACD
exp1 = data['Close'].ewm(span=12, adjust=False).mean()
exp2 = data['Close'].ewm(span=26, adjust=False).mean()
macd = exp1-exp2
exp3 = macd.ewm(span=9, adjust=False).mean()
data['MACD'] = macd
data['Signal Line'] = exp3
data = data.dropna()
data.tail()

# Example: Calculate the Bollinger Bands
data['20 Day MA'] = data['Close'].rolling(window=20).mean()
data['20 Day STD'] = data['Close'].rolling(window=20).std()
data['Upper Band'] = data['20 Day MA'] + (data['20 Day STD'] * 2)
data['Lower Band'] = data['20 Day MA'] - (data['20 Day STD'] * 2)
data = data.dropna()
data.tail()

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Example using just the moving average as a feature
X = data[['MA50', 'RSI', 'MACD', 'Upper Band', 'Lower Band']]

y = data['Close']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

model = LinearRegression()
model.fit(X_train, y_train)

# Predicting the stock prices
predictions = model.predict(X_test)

# Plotting the predictions
import matplotlib.pyplot as plt
# plt.scatter(y_test, predictions)
# plt.xlabel('Actual Price')
# plt.ylabel('Predicted Price')
# plt.title('Actual vs Predicted Price')
# plt.show()

# Assuming 'data' is your DataFrame and 'model' is your trained LinearRegression model

# Step 1: Isolate the last 7 days of data with the necessary features
# Make sure to not include the 'Close' column as it is what we're trying to predict
last_7_days_features = data[['MA50', 'RSI', 'MACD', 'Upper Band', 'Lower Band']][-30:]

# Step 2: Use the model to predict the closing prices for these days
predicted_prices_last_7_days = model.predict(last_7_days_features)

# Step 3: Compare the predicted prices with the actual closing prices
actual_prices_last_7_days = data['Close'][-30:]

# Print out the comparison
for actual, predicted in zip(actual_prices_last_7_days, predicted_prices_last_7_days):
    print(f"Actual: {actual}, Predicted: {predicted}")

# If you want to calculate the accuracy or some error metric like Mean Squared Error (MSE)
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(actual_prices_last_7_days, predicted_prices_last_7_days)
print(f"Mean Squared Error for the last 7 days: {mse}")

# Plotting the actual vs predicted prices for the last 7 days
plt.figure(figsize=(10, 5))
plt.plot(actual_prices_last_7_days.index, actual_prices_last_7_days, label='Actual Price')
plt.plot(actual_prices_last_7_days.index, predicted_prices_last_7_days, label='Predicted Price', linestyle='--')
plt.xlabel('Date')
plt.ylabel('Price')
plt.title('Actual vs Predicted Price for the Last 30 Days')
plt.legend()
plt.show()