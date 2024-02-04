import json

# Specify the file path
file_path = 'static/combined.json'

# Open the file in read mode ('r' for reading)
with open(file_path, 'r') as file:
    # Load JSON data from the file
    json_data = json.load(file)
    print(json_data)