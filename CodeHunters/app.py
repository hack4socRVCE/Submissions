# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from disease_predictor import predict_di
from symptoms import symptoms_get
import pyttsx3
import time

app = Flask(__name__)
CORS(app)

@app.route('/predict_di', methods=['POST'])
def predict_disease():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        prediction, probability = predict_di(symptoms)
        return jsonify({"prediction": prediction, "probability": probability})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_symptoms', methods=['GET', 'POST'])
def get_symptoms():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    try:
        disease_name = request.args.get('disease')
        symptoms_result = symptoms_get(disease_name)
        return jsonify(symptoms_result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def speak(message, delay=3):
    engine = pyttsx3.init()
    engine.say(message)
    engine.runAndWait()
    time.sleep(delay)

sessions = {}

@app.route('/start_conversation', methods=['POST'])
def start_conversation():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        sessions[user_id] = {'step': 1, 'messages': []}
        message = "Hello! I'm here to help you schedule an appointment. What is your name?"
        sessions[user_id]['messages'].append({'role': 'bot', 'text': message})
        return jsonify({"messages": sessions[user_id]['messages'], "error": None})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/continue_conversation', methods=['POST'])
def continue_conversation():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        user_input = data.get('user_input')

        if user_id not in sessions:
            return jsonify({"error": "Session not found."}), 404

        sessions[user_id]['messages'].append({'role': 'user', 'text': user_input})
        response, next_step = generate_bot_response(user_id, user_input)
        sessions[user_id]['messages'].append({'role': 'bot', 'text': response})
        sessions[user_id]['step'] = next_step

        return jsonify({"messages": sessions[user_id]['messages'], "error": None})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generate_bot_response(user_id, user_input):
    if sessions[user_id]['step'] == 1:
        message = f"Thank you, {user_input}! Now, please provide the doctor's name."
        return message, 2
    elif sessions[user_id]['step'] == 2:
        message = "Great! Please provide the date for the appointment (e.g., DD-MM-YYYY)."
        return message, 3
    elif sessions[user_id]['step'] == 3:
        message = "Thanks! Lastly, please provide the time for the appointment (e.g., HH:MM AM/PM)."
        return message, 4
    elif sessions[user_id]['step'] == 4:
        details = sessions[user_id].get('details', {})
        details['time'] = user_input
        if is_slot_available(details.get("time"), details.get("date")):
            appointment_details = {
                "hospital_name": "Your Hospital",
                "doctor_name": details.get("doctor"),
                "date": details.get("date"),
                "time": details.get("time")
            }
            speak("Appointment scheduled!")
            message = f"Appointment scheduled! Details: {appointment_details}"
        else:
            error_message = "I'm sorry, that slot is not available. Please choose another time."
            speak(error_message)
            message = error_message
        return message, 0  # End the conversation
    else:
        return "I'm sorry, I didn't understand that. How can I assist you?", sessions[user_id]['step']

def is_slot_available(time, date):
    # Implement your slot availability logic here (dummy implementation always returning True for simplicity)
    return True

if __name__ == '__main__':
    app.run(port=5000)
