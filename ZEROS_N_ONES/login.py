from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    # Logic to connect to your database and check for username/password
    conn = psycopg2.connect(
        user="your_username",
        password="your_password",
        host="your_host",
        port="your_port",
        database="your_database"
    )
    cursor = conn.cursor()
    
    # Make sure to use parameterized queries to prevent SQL injection
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if user:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'fail'}), 401
