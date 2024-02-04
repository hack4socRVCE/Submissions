import pyttsx3
import time

def speak(message, delay=1.5):
    engine = pyttsx3.init()
    engine.say(message)
    engine.runAndWait()
    time.sleep(delay)

def get_text_input(prompt):
    speak(prompt)
    return input("You (Type your response): ").lower()

def main():
    user_info = {"name": "", "doctor_name": "", "time": "", "date": "", "hospital_name": ""}

    # AI initiates the conversation
    speak("Hello! Welcome to the hospital. I am your virtual assistant. Let's schedule an appointment.")

    # AI asks for user's name
    user_info["name"] = get_text_input("May I know your name, please?")

    # AI engages in a conversation with the user
    user_info["doctor_name"] = get_text_input(f"Nice to meet you, {user_info['name']}! Can you please provide the name of the doctor you would like to see?")

    user_info["time"] = get_text_input(f"Great choice! Now, what time would be convenient for you to visit {user_info['doctor_name']}?")

    user_info["date"] = get_text_input(f"Perfect! Lastly, on which date would you prefer the appointment with {user_info['doctor_name']}?")

    # Check if the slot is available (you can implement this logic based on your requirements)
    if is_slot_available(user_info["time"], user_info["date"]):
        user_info["hospital_name"] = "Your Hospital"
        speak(f"Thank you for providing the details. I will proceed to schedule your appointment with {user_info['doctor_name']} at {user_info['time']} on {user_info['date']}.")
    else:
        speak("I'm sorry, that slot is not available. Please choose another time.")

    # Display appointment details
    speak("Here are the appointment details:")
    for key, value in user_info.items():
        speak(f"{key.capitalize()}: {value}")

    # Return the list with hospital name, doctor name, date, and time
    appointment_details = [user_info["hospital_name"], user_info["doctor_name"], user_info["date"], user_info["time"]]
    return appointment_details

def is_slot_available(time, date):
    # Implement your logic to check if the given time and date slot is available
    # For simplicity, always return True in this example
    return True

if __name__ == "__main__":
    appointment_result = main()
    print("Appointment Result:", appointment_result)