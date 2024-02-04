from flask import Flask, render_template, request
import datetime  

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    user_message = request.form["user_message"]
    bot_response = generate_bot_response(user_message)
    return bot_response

def generate_bot_response(user_message):
    # Simple rule-based responses
    if "hello" in user_message.lower():
        return "Hi there! How can I help you?"
    elif "how are you" in user_message.lower():
        return "I'm doing well, thank you!"
    elif "bye" in user_message.lower():
        return "Goodbye! Have a great day."
    elif "what is the time" in user_message.lower() or "time" in user_message.lower():
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        return f"The current system time is {current_time}."
    elif "date" in user_message.lower():
        current_date = datetime.date.today().strftime("%Y-%m-%d")
        return f"The current date is {current_date}."
    elif "annual rainfall in tamil nadu" in user_message.lower():
        return "Annual rainfall in Tamil Nadu is 790.3 cm."
    elif "season is bajra grown in telangana" in user_message.lower():
        return "It is harvested in Kharif season."
    elif "fertilizer for ragi in puducherry" in user_message.lower():
        return "The fertilizer used for ragi in puducherry is 572.16 kg/year."
    elif "area for garlic in karnataka" in user_message.lower():
        return "The area for garlic in Karnataka is 4991.0 acre."
    elif "minimum fertilizer" in user_message.lower():
        return "Minimum fertilizer of 98.17 kg/year is used in cultivation of coriander in Puducherry."
    elif "pesticide 5137.7" in user_message.lower():
        return "Cowpea in Andhra Pradesh uses 5137.7 kg/year of pesticide."
    elif "three crops goa" in user_message.lower():
        return "Three crops in Goa are Ground nut, Castor seed, and ragi."
    elif "high demand crop in andhra pradesh" in user_message.lower():
        return "Paddy rice."
    elif "crops that can be grown all over the year in Karnataka" in user_message.lower():
        return "Garlic, Coriander, Mesta."
    elif "what is the weather" in user_message.lower():
        return "I'm sorry, I don't have access to real-time weather information."
    else:
        return "I'm not sure how to respond to that."

if __name__ == "__main__":
    app.run(debug=True)
