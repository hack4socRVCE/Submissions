# app.py
from flask import Flask, render_template, request, jsonify
import openai
from Plotprice import fake_plot_price_prediction
from flask import Flask, render_template, request
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64
from Houseplan import generate_floor_plan, visualize_floor_plan, get_user_input
from flask import Flask, render_template, request
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64
from Houseplan import generate_floor_plan, visualize_floor_plan, get_user_input

app = Flask(__name__)
openai.api_key = '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'  # Replace with your actual OpenAI API key

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/generate', methods=['POST'])
def generate():
    if request.method == 'POST':
        length = float(request.form['length'])
        breadth = float(request.form['breadth'])
        num_floors = int(request.form['num_floors'])
        num_rooms = int(request.form['num_rooms'])
        num_kitchens = int(request.form['num_kitchens'])
        has_swimming_pool = request.form.get('has_swimming_pool') == 'on'
        num_parking_spaces = int(request.form['num_parking_spaces'])

        floor_plans = []

        for floor_number in range(1, num_floors + 1):
            floor_plan = generate_floor_plan(length, breadth, num_rooms, num_kitchens, floor_number, has_swimming_pool, num_parking_spaces)
            floor_plans.append((floor_number, floor_plan_to_image(floor_plan)))

        return render_template('result.html', floor_plans=floor_plans)

def floor_plan_to_image(floor_plan):
    plt.imshow(floor_plan, cmap='tab10', interpolation='nearest')
    plt.axis('off')
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return base64.b64encode(img.getvalue()).decode()

@app.route('/predict', methods=['POST'])
def predict():
    area_number = int(request.form['area_number'])
    plot_dimensions = float(request.form['plot_dimensions'])
    distance_from_main_road = float(request.form['distance_from_main_road'])
    amenities_count = int(request.form['amenities_count'])
    khata_preference = request.form['khata_preference']

    area_name, estimated_price = fake_plot_price_prediction(area_number, plot_dimensions, distance_from_main_road, amenities_count, khata_preference)

    return render_template('result2.html', area_name=area_name, estimated_price=estimated_price)

@app.route('/chati', methods=['GET'])
def redirectToChat():
    return render_template('chatindex.html')

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    user_message = request.form['user_message']

    # Use the v1/chat/completions endpoint for chat models
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Choose the appropriate model
        messages=[
            {"role": "system", "content": "You are UrbanAI. Introduce yourself as UrbanAI. A helpful assistant in urban development. Any questions asked irrelevant to urban development should not be answered. Don't answer any personal messages such as how are you, and all. Keep your answers short and simple. Be professional, don't be personal. You are trained only and only to answer questions related to urban development. Any questions outside this domain should be answered void. If such questions are asked, your answer should be VOID in capitals. The user should not get to know that you are ChatGPT"},
            {"role": "user", "content": user_message},
        ]
    )

    chat_response = response['choices'][0]['message']['content']

    # Return the response to the HTML page
    return jsonify({'chat_response': chat_response})

@app.route('/bypass', methods=['GET', 'POST'])
def redirectToHomepage():
    logo_url = "/static/images/logo.png"
    return render_template('homepage.html', logo_url=logo_url)


@app.route('/signup', methods=['GET', 'POST'])
def redirectToSignup():
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def redirectToLogin():  # Change the function name here
    return render_template('login.html')

@app.route('/index', methods=['GET', 'POST'])
def redirectToindex():  # Change the function name here
    return render_template('index.html')

@app.route('/floor', methods=['GET', 'POST'])
def redirectToFloor():
    return render_template('floor.html')

if __name__ == '__main__':
    app.run(debug=True, port=9000)
