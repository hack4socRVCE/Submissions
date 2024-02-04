import mysql.connector


userdata_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Home@5095',
    'database': 'information'
}

checkdata_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Home@5095',
    'database': 'information'
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
                    print(f"Passwords match for email: {email}")
                else:
                    print(f"Passwords do not match for email: {email}")
            else:
                print(f"No entry found in checkdata for email: {email}")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        
        if userdata_conn.is_connected():
            userdata_cursor.close()
            userdata_conn.close()

        if checkdata_conn.is_connected():
            checkdata_cursor.close()
            checkdata_conn.close()

if __name__ == "__main__":
    compare_passwords()
