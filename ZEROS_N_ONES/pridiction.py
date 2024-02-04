# import yfinance as yf
# from sklearn.linear_model import LinearRegression
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error
# import numpy as np
# import pandas as pd

# # Define stocks to analyze
# stocks = [
#     "OIL.NS", "DELHIVERY.NS", "APOLLOTYRE.NS", "GUJGASLTD.NS", "HINDPETRO.NS"
#     # "PERSISTENT.NS", "CUMMINSIND.NS", "JSWENERGY.NS", "POWERGRID.NS", "RECLTD.NS",
#     # "TATAPOWER.NS", "LICI.NS", "RELIANCE.NS", "PFC.NS", "CANBK.NS",
#     # "SAMVARDHANA.NS", "TATAMOTORS.NS", "GICRE.NS", "UNIONBANK.NS", "SUZLON.NS",
#     # "CENTRALBK.NS", "BHEL.NS", "ONGC.NS", "HEROMOTOCO.NS", "NLCINDIA.NS",
#     # "PETRONET.NS", "ABBOTINDIA.NS", "NBCC.NS"
# ]


# # Placeholder function to fetch and prepare data for a given stock
# def prepare_data(stock_symbol):
#     # Fetch historical data
#     data = yf.download(stock_symbol, start='2023-12-02', end='2024-02-02')
    
#     # Calculate technical indicators
#     data['MA50'] = data['Close'].rolling(50).mean()
#     data['RSI'] = np.random.normal(50, 10, len(data))  # Placeholder for actual RSI calculation
#     data['MACD'] = np.random.normal(0, 1, len(data))  # Placeholder for actual MACD calculation
#     data['Upper Band'], data['Lower Band'] = np.random.normal(100, 20, len(data)), np.random.normal(80, 20, len(data))  # Placeholder for Bollinger Bands
    
#     # Drop rows with NaN values
#     data = data.dropna()
#     return data

# # Train a model for each stock and predict future price (simplified version)
# def train_and_predict(stock_symbol):
#     data = prepare_data(stock_symbol)
    
#     # Feature and target matrices
#     X = data[['MA50', 'RSI', 'MACD', 'Upper Band', 'Lower Band']]
#     y = data['Close']
    
#     # Split the data
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    
#     # Train the model
#     model = LinearRegression().fit(X_train, y_train)
    
#     # Predict and calculate the return
#     current_price = y.iloc[-1]
#     predicted_price = model.predict(X.iloc[[-1]])[0]
#     predicted_return = (predicted_price - current_price) / current_price * 100
    
#     return predicted_return

# # Select stocks based on risk level
# def select_stocks(risk_level):
#     risk_return_threshold = {'low': 10, 'medium': 25, 'high': 30}
#     selected_stocks = []
    
#     for stock in stocks:
#         predicted_return = train_and_predict(stock)
#         if predicted_return >= risk_return_threshold[risk_level]:
#             selected_stocks.append((stock, predicted_return))
    
#     # Sort stocks by predicted return
#     selected_stocks.sort(key=lambda x: x[1], reverse=True)
    
#     return selected_stocks[:]

# # Example: Selecting stocks for a "low" risk level
# selected_stocks_for_low_risk = select_stocks("low")
# # if not X.empty:
# #     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
# # else:
# #     print("The dataset is empty.")
# print("Selected stocks for low risk level:", selected_stocks_for_low_risk)
