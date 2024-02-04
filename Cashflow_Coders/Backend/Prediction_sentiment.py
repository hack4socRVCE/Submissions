# IMPORTING IMPORTANT LIBRARIES
import keras
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np 
import math
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.models import load_model
from keras.layers import Dense, Activation, LSTM
import preprocessing 
import xgboost
import shap

# FOR REPRODUCIBILITY
np.random.seed(7)

# IMPORTING DATASET 
merged_data = pd.read_csv('combined.csv')  # Replace with the actual path to your combined data CSV

# Convert relevant columns to numeric
merged_data[['Open', 'High', 'Low', 'Close']] = merged_data[['Open', 'High', 'Low', 'Close']].apply(pd.to_numeric, errors='coerce')

# CREATING OWN INDEX FOR FLEXIBILITY
obs = np.arange(1, len(merged_data) + 1, 1)

# TAKING DIFFERENT INDICATORS FOR PREDICTION
OHLC_avg = merged_data[['Open', 'High', 'Low', 'Close']].mean(axis=1)
sentiment_encoded = merged_data['sentiment_encoded']

# PLOTTING ALL INDICATORS IN ONE PLOT
plt.plot(obs, OHLC_avg, 'r', label='OHLC avg')
plt.plot(obs, sentiment_encoded, 'm', label='Sentiment Encoded')
plt.legend(loc='upper right')
plt.show()

# PREPARATION OF TIME SERIES DATASET
OHLC_avg = np.reshape(OHLC_avg.values, (len(OHLC_avg), 1))  # 1664
scaler = MinMaxScaler(feature_range=(0, 1))
OHLC_avg = scaler.fit_transform(OHLC_avg)

# Concatenate 'sentiment_encoded' to the OHLC_avg
OHLC_avg = np.concatenate([OHLC_avg, sentiment_encoded.values.reshape(-1, 1)], axis=1)

# TRAIN-TEST SPLIT
train_OHLC = int(len(OHLC_avg) * 0.75)
test_OHLC = len(OHLC_avg) - train_OHLC
train_OHLC, test_OHLC = OHLC_avg[0:train_OHLC, :], OHLC_avg[train_OHLC:len(OHLC_avg), :]

# TIME-SERIES DATASET (FOR TIME T, VALUES FOR TIME T+1)
trainX, trainY = preprocessing.new_dataset(train_OHLC, 1)
testX, testY = preprocessing.new_dataset(test_OHLC, 1)

# RESHAPING TRAIN AND TEST DATA
trainX = np.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
testX = np.reshape(testX, (testX.shape[0], 1, testX.shape[1]))
step_size = 1

# LSTM MODEL
model = Sequential()
model.add(LSTM(32, input_shape=(1, step_size), return_sequences=True))
model.add(LSTM(16))
model.add(Dense(1))
model.add(Activation('linear'))

# MODEL COMPILING AND TRAINING
model.compile(loss='mean_squared_error', optimizer='adagrad')  # Try SGD, adam, adagrad and compare!!!
#model.fit(trainX, trainY, epochs=285, batch_size=2, verbose=2)
#model.save('stockpred_with_sentiment_no_adj_close_volume.keras')

model = load_model('stockpred_with_sentiment_no_adj_close_volume.keras')
# PREDICTION
trainPredict = model.predict(trainX)
testPredict = model.predict(testX)

# DE-NORMALIZING FOR PLOTTING
trainPredict = scaler.inverse_transform(trainPredict)
trainY = scaler.inverse_transform([trainY])
testPredict = scaler.inverse_transform(testPredict)
testY = scaler.inverse_transform([testY])

# TRAINING RMSE
trainScore = math.sqrt(mean_squared_error(trainY[0], trainPredict[:, 0]))
print('Train RMSE: %.2f' % (trainScore))

# TEST RMSE
testScore = math.sqrt(mean_squared_error(testY[0], testPredict[:, 0]))
print('Test RMSE: %.2f' % (testScore))

# CREATING SIMILAR DATASET TO PLOT TRAINING PREDICTIONS
trainPredictPlot = np.empty_like(OHLC_avg)
trainPredictPlot[:, :] = np.nan
trainPredictPlot[step_size:len(trainPredict)+step_size, :] = trainPredict

# CREATING SIMILAR DATASET TO PLOT TEST PREDICTIONS
testPredictPlot = np.empty_like(OHLC_avg)
testPredictPlot[:, :] = np.nan
testPredictPlot[len(trainPredict)+(step_size*2)+1:len(OHLC_avg)-1, :] = testPredict

# DE-NORMALIZING MAIN DATASET
OHLC_avg = scaler.inverse_transform(OHLC_avg[:, :-1])  # Exclude sentiment_encoded column

# PLOT OF MAIN OHLC VALUES, TRAIN PREDICTIONS AND TEST PREDICTIONS
plt.plot(OHLC_avg, 'g', label='original dataset')
plt.plot(trainPredictPlot[:, :-1], 'r', label='training set')
plt.plot(testPredictPlot[:, :-1], 'b', label='predicted stock price/test set')
plt.legend(loc='upper right')
plt.xlabel('Time in Days')
plt.ylabel('OHLC Value of Apple Stocks')
plt.show()

# Print the predicted values for the next 7 days
last_val = testPredict[-1]
last_val_scaled = last_val / last_val  # scaling the last value
predicted_values = []

# Predicting the next 7 days
for _ in range(7):
    next_val = model.predict(np.reshape(last_val_scaled, (1, 1, step_size)))
    predicted_values.append(last_val * next_val)
    last_val_scaled = next_val

# Print the predicted values for the next 7 days
for i, val in enumerate(predicted_values, start=1):
    print(f"Day {i}: Predicted Value - {val}")
