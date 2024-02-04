from flask import Flask, render_template, request
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64
from Houseplan import generate_floor_plan, visualize_floor_plan, get_user_input

app = Flask(__name__)

@app.route('/')
def index1():
    return render_template('floor.html')

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

if __name__ == '__main__':
    app.run(debug=True)
