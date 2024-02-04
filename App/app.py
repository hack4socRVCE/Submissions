from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/dashboard') 
def dashboard():
    return render_template('dashboard.html')

@app.route('/login') 
def login():
    return render_template('login.html')
    
@app.route('/documentation') 
def documentation():
    return render_template('documentation.html')

@app.route('/stocks')
def stocks():
    return render_template('stocks.html')

@app.route('/loan')
def loan():
    return render_template('loan.html')

if __name__ == '__main__':
    app.run(debug=True)

    