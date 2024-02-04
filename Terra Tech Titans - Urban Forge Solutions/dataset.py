from flask import Flask, render_template, request
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import numpy as np

app = Flask(__name__)

def get_user_input():
    length = float(request.form['length'])
    breadth = float(request.form['breadth'])
    num_floors = int(request.form['num_floors'])
    num_rooms = int(request.form['num_rooms'])
    num_kitchens = int(request.form['num_kitchens'])
    has_swimming_pool = request.form.get('has_swimming_pool') == 'on'
    num_parking_spaces = int(request.form['num_parking_spaces'])

    return length, breadth, num_floors, num_rooms, num_kitchens, has_swimming_pool, num_parking_spaces

def generate_floor_plan(length, breadth, num_rooms, num_kitchens, floor_number, has_swimming_pool=False, num_parking_spaces=0):
    # (Include the remaining content of the generate_floor_plan function from Houseplan.py)
    # Define the land dimensions
    land = np.zeros((int(length), int(breadth)))

    # Track the number of areas generated for each type
    generated_rooms = 0
    generated_kitchens = 0
    generated_bathrooms = 0

    # Add rooms with balconies and bathrooms inside
    while generated_rooms < num_rooms:
        # Increase the range for room dimensions
        room_length = np.random.randint(min(int(length / 4), int(breadth / 4)), min(int(length / 2), int(breadth / 2)))
        room_breadth = np.random.randint(min(int(length / 4), int(breadth / 4)), min(int(length / 2), int(breadth / 2)))

        # Place rooms towards the wall
        edge = np.random.choice(['top', 'bottom', 'left', 'right'])
        if edge == 'top':
            x, y = 0, np.random.randint(0, land.shape[1] - room_breadth)
        elif edge == 'bottom':
            x, y = land.shape[0] - room_length, np.random.randint(0, land.shape[1] - room_breadth)
        elif edge == 'left':
            x, y = np.random.randint(0, land.shape[0] - room_length), 0
        elif edge == 'right':
            x, y = np.random.randint(0, land.shape[0] - room_length), land.shape[1] - room_breadth

        # Add balcony inside the room
        if has_balcony:
            balcony_length = min(int(room_length / 2), int(room_breadth / 2))
            balcony_breadth = min(int(room_length / 2), int(room_breadth / 2))
            balcony_x, balcony_y = find_overlapping_position(land, x, y, balcony_length, balcony_breadth)
            land[balcony_x:balcony_x + balcony_length, balcony_y:balcony_y + balcony_breadth] = 4

        # Add bathroom inside the room
        bathroom_length = min(int(room_length / 2), int(room_breadth / 2))
        bathroom_breadth = min(int(room_length / 2), int(room_breadth / 2))
        bathroom_x, bathroom_y = find_overlapping_position(land, x, y, bathroom_length, bathroom_breadth)
        land[bathroom_x:bathroom_x + bathroom_length, bathroom_y:bathroom_y + bathroom_breadth] = 3

        # Mark the room area
        land[x:x + room_length, y:y + room_breadth] = 1

        generated_rooms += 1
        generated_bathrooms += 1

    # Add kitchens without overlapping
    while generated_kitchens < num_kitchens:
        kitchen_length = np.random.randint(1, min(int(length / 2), int(breadth / 2)))
        kitchen_breadth = np.random.randint(1, min(int(length / 2), int(breadth / 2)))
        x, y = find_non_overlapping_position(land, kitchen_length, kitchen_breadth)
        land[x:x + kitchen_length, y:y + kitchen_breadth] = 2

        generated_kitchens += 1

    # Add swimming pool and parking spaces on floor 1
    if floor_number == 1 and has_swimming_pool:
        pool_length = min(int(length / 2), int(breadth / 2))
        pool_breadth = min(int(length / 2), int(breadth / 2))
        pool_x, pool_y = find_non_overlapping_position(land, pool_length, pool_breadth)
        land[pool_x:pool_x + pool_length, pool_y:pool_y + pool_breadth] = 5  # Mark swimming pool

    if floor_number == 1 and num_parking_spaces > 0:
        # Add parking spaces
        while num_parking_spaces > 0:
            parking_length = min(int(length / 2), int(breadth / 2))
            parking_breadth = min(int(length / 2), int(breadth / 2))
            parking_x, parking_y = find_non_overlapping_position(land, parking_length, parking_breadth)
            land[parking_x:parking_x + parking_length, parking_y:parking_y + parking_breadth] = 6  # Mark parking space

            num_parking_spaces -= 1

    return land

def find_overlapping_position(land, base_x, base_y, length, breadth):
    # Find a position that allows overlapping
    x = np.random.randint(max(0, base_x - length), min(land.shape[0] - length, base_x + length - 1))
    y = np.random.randint(max(0, base_y - breadth), min(land.shape[1] - breadth, base_y + breadth - 1))
    return x, y


# Rest of the code remains the same...


def find_non_overlapping_position(land, length, breadth):
    while True:
        x = np.random.randint(0, land.shape[0] - length)
        y = np.random.randint(0, land.shape[1] - breadth)
        if np.all(land[x:x + length, y:y + breadth] == 0):
            return x, y



def visualize_floor_plan(floor_plan, floor_number):
    # (Include the remaining content of the visualize_floor_plan function from Houseplan.py)
    plt.imshow(floor_plan, cmap='tab10', interpolation='nearest')
    plt.title(f'Floor Plan - Floor {floor_number}')
    plt.xlabel('Breadth (meters)')
    plt.ylabel('Length (meters)')
    plt.colorbar(ticks=[0, 1, 2, 3, 4], label='0: Empty, 1: Room, 2: Kitchen, 3: Bathroom, 4: Balcony')
    plt.text(0.5, 1.05, 'Rooms', color='tab:blue', transform=plt.gca().transAxes)
    plt.text(0.5, 1.1, 'Kitchens', color='tab:orange', transform=plt.gca().transAxes)
    plt.text(0.5, 1.15, 'Bathrooms', color='tab:green', transform=plt.gca().transAxes)
    plt.text(0.5, 1.2, 'Balcony', color='tab:red', transform=plt.gca().transAxes)
    plt.show()


    # (Include the remaining content of the floor_plan_to_base64 function from Houseplan.py)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    if request.method == 'POST':
        length, breadth, num_floors, num_rooms, num_kitchens, has_swimming_pool, num_parking_spaces = get_user_input()

        plans = []
        for floor_number in range(1, num_floors + 1):
            floor_plan = generate_floor_plan(length, breadth, num_rooms, num_kitchens, floor_number, has_swimming_pool, num_parking_spaces)
            plans.append({'floor_number': floor_number, 'floor_plan': floor_plan})

        return render_template('result.html', plans=plans)

if __name__ == "__main__":
    app.run(debug=True)
