from flask import Flask, render_template, request
import datetime  # Add this import for handling time

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
    elif "what is the time" in user_message.lower():
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        return f"The current system time is {current_time}."
    else:
        return "I'm not sure how to respond to that."

if __name__ == "__main__":
    app.run(debug=True)


