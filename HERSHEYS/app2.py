


from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)


host = "localhost"
user = "root"
password = "YOUR PASSWORD"
database = "information"

userdata_config = {
    'host': host,
    'user': user,
    'password': password,
    'database': database
}

checkdata_config = {
    'host': host,
    'user': user,
    'password': password,
    'database': database
}

def compare_passwords():
    try:
        
        userdata_conn = mysql.connector.connect(**userdata_config)
        userdata_cursor = userdata_conn.cursor()

        
        checkdata_conn = mysql.connector.connect(**checkdata_config)
        checkdata_cursor = checkdata_conn.cursor()

        
        userdata_cursor.execute("SELECT email, password FROM userdata")
        userdata_results = userdata_cursor.fetchall()

        for email, password_userdata in userdata_results:
            
            checkdata_cursor.execute("SELECT password FROM checkdata WHERE email = %s", (email,))
            checkdata_result = checkdata_cursor.fetchone()

            if checkdata_result:
                password_checkdata = checkdata_result[0]

               
                if password_userdata == password_checkdata:
                    return f"Passwords match for email: {email}"
                else:
                    return f"Passwords do not match for email: {email}.Please try again."
            else:
                return f"No entry found in checkdata for email: {email}"

    except Exception as e:
        return f"Error: {e}"

    finally:
       
        if userdata_conn.is_connected():
            userdata_cursor.close()
            userdata_conn.close()

        if checkdata_conn.is_connected():
            checkdata_cursor.close()
            checkdata_conn.close()

@app.route("/")
def index():
    return render_template("index2.html")

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

        
        insert_query = "INSERT INTO checkdata (email, password) VALUES (%s, %s)"
        data_values = (data['email'], data['password'])
        cursor.execute(insert_query, data_values)

        
        connection.commit()

       
        cursor.close()
        connection.close()

       
        match_message = compare_passwords()
        return jsonify({"message": "Data submitted successfully!", "match_message": match_message})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
















