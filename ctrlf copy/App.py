from flask import Flask, jsonify, request
import joblib
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/predict', methods=['GET'])
def predict():
    # Load your model
    model = joblib.load('model.joblib')

    # Get the data from the request
    data = request.json
    # data_values = list(data[.values())
    # data = np.array(data_values).reshape(-1, 1)
    # data= np.array(data).reshape(1, -1)

    # Make a prediction
    prediction = model.predict([data])

    # Return the prediction
    return jsonify(prediction.tolist())

if __name__ == '__main__':
    app.run(debug=True)


# backend/app.py

# from flask import Flask, request, jsonify
# from joblib import load
# import datetime
# from flask_cors import CORS
# import numpy as np

# app = Flask(__name__)
# CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# # Load the trained model
# model = load('model.joblib')

    

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Assuming the input data is sent as JSON in the request body
#     input_data = request.get_json()
#     # to_predict_list = request.form.to_dict()
#     to_predict_list = list(to_predict_list.values())
#     input_data = list(map(int, to_predict_list))

#     # Make predictions using the loaded model
#     # prediction = model.predict([input_data['Crop'], input_data['Season'], input_data['State'], input_data['Area'], input_data['Production'],input_data['Annual_Rainfall'],input_data['Fertilizer'],input_data['Pesticide']])
#     prediction=model(to_predict)
#     # return jsonify({'prediction': prediction.tolist()})
#     print(jsonify({'prediction': prediction[0]}))

# if __name__ == '__main__':
#     app.run(debug=True)