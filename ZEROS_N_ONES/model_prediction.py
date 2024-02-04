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

next_30_days_features = data[['MA50', 'RSI', 'MACD', 'Upper Band', 'Lower Band']][]

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
# plt.figure(figsize=(10, 5))
# plt.plot(actual_prices_last_7_days.index, actual_prices_last_7_days, label='Actual Price')
# plt.plot(actual_prices_last_7_days.index, predicted_prices_last_7_days, label='Predicted Price', linestyle='--')
# plt.xlabel('Date')
# plt.ylabel('Price')
# plt.title('Actual vs Predicted Price for the Last 30 Days')
# plt.legend()
# plt.show()

risk = input("Enter the risk level (low, medium, high): ")
if (risk == "low"):
    # By using the above model we need to return stocks which will return 20% in 1 month
    # We can use the model to predict the closing prices for the next 30 days
    # We can then sort the stocks based on the predicted price and return the top 5
    pass
    
def get_top_stocks(stocks, predict_return, num_top_stocks=5):
    # Predict the return for each stock
      # Replace [...] with the actual list of stocks

    def predict_return(stock):
        # Use the model to predict the closing price for the next 30 days
        next_30_days_features = data[['MA50', 'RSI', 'MACD', 'Upper Band', 'Lower Band']][-29:].append(stock)
        predicted_price = model.predict(next_30_days_features)[-1]
        
        # Calculate the predicted return as a percentage
        current_price = data['Close'].iloc[-1]
        predicted_return = (predicted_price - current_price) / current_price * 100
        
        return predicted_return

    top_stocks = get_top_stocks(my_stocks, predict_return)
    predicted_returns = {stock: predict_return(stock) for stock in my_stocks}

    # Sort the stocks by predicted return in descending order
    sorted_stocks = sorted(predicted_returns, key=predicted_returns.get, reverse=True)

    # Return the top stocks
    return sorted_stocks[:num_top_stocks]

top_stocks = get_top_stocks(my_stocks, my_predictive_model)






import yfinance as yf
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np
import pandas as pd

# Define stocks to analyze
stocks = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "HINDUNILVR.NS",
    "ICICIBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "KOTAKBANK.NS",
    "GODREJCP.NS", "ASHOKLEY.NS", "APOLLOHOSP.NS", "BEL.NS", "MUTHOOTFIN.NS",
    "TATAPOWER.NS", "ABFRL.NS", "PEL.NS", "MINDTREE.NS", "L&TFH.NS",
    "JUSTDIAL.NS", "RBLBANK.NS", "INDIAMART.NS", "VMART.NS", "DIXON.NS",
    "DEEPAKNTR.NS", "NAVINFLUOR.NS", "AFFLE.NS", "KEI.NS", "TEJASNET.NS"
]

# Placeholder function to fetch and prepare data for a given stock
def prepare_data(stock_symbol):
    # Fetch historical data
    data = yf.download(stock_symbol, start='2023-01-01', end='2024-01-31')
    
    # Calculate technical indicators
    data['MA50'] = data['Close'].rolling(50).mean()
    data['RSI'] = np.random.normal(50, 10, len(data))  # Placeholder for actual RSI calculation
    data['MACD'] = np.random.normal(0, 1, len(data))  # Placeholder for actual MACD calculation
    data['Upper Band'], data['Lower Band'] = np.random.normal(100, 20, len(data)), np.random.normal(80, 20, len(data))  # Placeholder for Bollinger Bands
    
    # Drop rows with NaN values
    data = data.dropna()
    
    return data

# Train a model for each stock and predict future price (simplified version)
def train_and_predict(stock_symbol):
    data = prepare_data(stock_symbol)
    
    # Feature and target matrices
    X = data[['MA50', 'RSI', 'MACD', 'Upper Band', 'Lower Band']]
    y = data['Close']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    
    # Train the model
    model = LinearRegression().fit(X_train, y_train)
    
    # Predict and calculate the return
    current_price = y.iloc[-1]
    predicted_price = model.predict(X.iloc[[-1]])[0]
    predicted_return = (predicted_price - current_price) / current_price * 100
    
    return predicted_return

# Select stocks based on risk level
def select_stocks(risk_level):
    risk_return_threshold = {'low': 20, 'medium': 25, 'high': 30}
    selected_stocks = []
    
    for stock in stocks:
        predicted_return = train_and_predict(stock)
        if predicted_return >= risk_return_threshold[risk_level]:
            selected_stocks.append((stock, predicted_return))
    
    # Sort stocks by predicted return
    selected_stocks.sort(key=lambda x: x[1], reverse=True)
    
    return selected_stocks[:5]

# Example: Selecting stocks for a "low" risk level
selected_stocks_for_low_risk = select_stocks("low")
print("Selected stocks for low risk level:", selected_stocks_for_low_risk)
