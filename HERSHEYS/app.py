
from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)


host = "localhost"
user = "root"
password = "your_passwd"
database = "information"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit_data", methods=["POST"])
def submit_data():
    try:
        
        data = request.get_json()

        
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

        
        cursor = connection.cursor()

        
        insert_query = "INSERT INTO userdata (name, email, age, password) VALUES (%s, %s, %s, %s)"
        data_values = (data['name'], data['email'], data['age'], data['password'])
        cursor.execute(insert_query, data_values)

        
        connection.commit()

        
        cursor.close()
        connection.close()

        return jsonify({"message": "Data submitted successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
