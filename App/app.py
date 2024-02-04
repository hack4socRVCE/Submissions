from flask import Flask, render_template, request, redirect,url_for
from flask_sqlalchemy import SQLAlchemy
import datetime
from user import User 
from user_finances import FinancesDB 
app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        print("INSIDE POST")
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        password = request.form['password']  # Consider hashing this password before storing
        registration_date = datetime.datetime.now()
        
        # Create an instance of User and register
        user = User()
        # User.create_database()
        
        User.insert_user(name, email, phone, password, registration_date)
        rows=User.fetch_data()
        for row in rows:
            print(row)
        return redirect(url_for('login'))  # Redirect to a success page or another route as desired
    return render_template('signup.html')


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('dashboard.html')




@app.route('/login', methods=['GET', 'POST']) 
def login():
    user = User()
    if request.method == 'POST':
        
        name = request.form['name']
        password = request.form['password']
        
        if password is not None and name is not None:

            details=User.search(name,password)
        
            if(details):
                flag=True
                return redirect(url_for('dashboard'))
                
            else:
                flag=False
                return "UnAuthorized"
        
    else:
        return render_template('login.html')



@app.route('/store-data', methods=['GET', 'POST'])
def store_data():
    db=FinancesDB()
    db.create_database('cls')
    FinancesDB.create_table('cls')
    print("created")    
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Validate data
            if not all(key in data for key in ['Income', 'Expense', 'goal', 'time', 'product']):
                print("AREEEBCCCC")
                print(data)
                return jsonify({'error': 'Missing data'}), 400

            # Insert data into the database
            db.insert_info(Income=data['Income'], Expense=data['Expense'], goal=data['goal'], time=data['time'], product=data['product'])
            return jsonify({'message': 'Data stored successfully'}), 200
        except Exception as e:
            # Handle exceptions and return a meaningful error message
            return jsonify({'error': str(e)}), 500
    else:
        # Explicitly handle GET requests
        return render_template('index.html')





@app.route('/documentation') 
def documentation():
    return render_template('documentation.html')

if __name__ == '__main__':
    app.run(debug=True)