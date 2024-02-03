from flask import Flask, render_template

from flask import Flask


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

if __name__ == '__main__':
    app.run(debug=True)

    