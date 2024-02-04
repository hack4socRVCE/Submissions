from flask import Flask, render_template, redirect, url_for, flash, request,session
from flask_sqlalchemy import SQLAlchemy
import os
from flask_wtf import FlaskForm
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from flask_session import Session
import bcrypt
from dotenv import load_dotenv
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email
from werkzeug.utils import secure_filename
from llama_index import VectorStoreIndex, ServiceContext, Document
from llama_index.llms import OpenAI
import openai
from llama_index import SimpleDirectoryReader
from io import StringIO
from PyPDF2 import PdfReader
from pathlib import Path
import easyocr
import re
from youtube_transcript_api import YouTubeTranscriptApi
import os
from docx import Document
import wolframalpha


load_dotenv()


app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'docx'}
openai.api_key = os.getenv('openai_api_key')
# Configuration for Flask-WTF and Flask-Mail
app.config['SECRET_KEY'] = 'h4ck4$0ck'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # Use your actual database URI

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize Flask extensions
db = SQLAlchemy(app)


# Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# WTForms for Signup
class SignupForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Sign Up')

# Generate a random 6-digit OTP
def generate_otp():
    return secrets.token_hex(3)


def hash_password(password):
    # Generate a random salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def message(text,subject="OTP for Enigma",
                
                img=None,
                attachment=None):
    
      # build message contents
    msg = MIMEMultipart()
    
      # Add Subject
    msg['Subject'] = subject

    # Add text contents
    msg.attach(MIMEText(text))
    return msg


# Send email with OTP
def send_otp_email(email, otp):
        smtp = smtplib.SMTP('smtp.gmail.com', 587)
        smtp.ehlo()
        smtp.starttls()
        email_pw = os.getenv('pw')
        # Login with your email and password
        smtp.login('rvsocialadm@gmail.com',email_pw)
        
        to = email
        msg = message(f"Your OTP is: {otp}")
        smtp.sendmail(from_addr="rvsocialadm@gmail.com",
                    to_addrs=to,
                    msg=str(msg))
        
        smtp.quit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')


global otp
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()

    if request.method == 'POST':

        email = request.form.get('rvcemail')
        session['user_email'] = email
        otp = generate_otp()
        print(email,otp)
                # Check if a user with the given email or username already exists
        existing_user = User.query.filter((User.email == email)).first()

        if existing_user:
            flash('User with the provided email or username already exists. Please use a different email or username.')
            return redirect(url_for('signup'))
        session["otp_u"] = otp
        # Send OTP via email
        send_otp_email(email, otp)

        flash('An email with OTP has been sent. Please check your email and enter the OTP.')
        return redirect(url_for('verify_otp'))

    return render_template('signup.html', form=form)

@app.route('/verify_otp', methods=['GET', 'POST'])
def verify_otp():
    if request.method == 'POST':
        print(request.form)
        entered_otp = request.form.get('otp')
        user_email = session.get('user_email')
        user_name = request.form.get('username')
        password = request.form.get('password')
        hashed_salted = hash_password(password)
        
        session['username'] = user_name
        
        

        # Query the database for the user with the entered email
        with app.app_context():
            

            if entered_otp == session.get('otp_u'):
                print("Success")
                with app.app_context():
                   
                    new_user = User(username=user_name,email=user_email,password=hashed_salted)
                    db.session.add(new_user)
                    db.session.commit()
                flash('OTP Verified! You are now signed up.')
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid OTP. Please try again.')

    return render_template('verify_otp.html')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if request.method == 'POST':
        email = request.form.get('rvcemail')
        password = request.form.get('password')

        # Query the database for the user with the entered email
        user = User.query.filter_by(email=email).first()

        if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
            # Login successful, you can store user information in the session
            flash('Login successful!')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password. Please try again.')

    return render_template('login.html', form=form)


def load_data():
    reader = SimpleDirectoryReader(input_dir='static\\uploads', recursive=True)
    docs = reader.load_data()
    service_context = ServiceContext.from_defaults(llm=OpenAI(model="gpt-3.5-turbo", temperature=0.5, system_prompt="You're an AI based tutoring/study partner. explain the topics given to you in a neat and precise manner, do not hallucinate or make up facts. Be pleasant and patient. You also support regional Indian languages like Kannada and Hindi only."))
    index = VectorStoreIndex.from_documents(docs, service_context=service_context)
    query_engine = index.as_query_engine()
    return query_engine


ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt','png','jpg','jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text()
            if text == None:
                text = 'No data here'
            else:

                with open('static/uploads/outputpdf.txt', 'w', encoding='utf-8') as f:
                    f.write(text)
    

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    text = """"""
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
        if text == None:
            text = 'No data here'
        else:
            with open('static/uploads/output.txt', 'w', encoding='utf-8') as f:
                f.write(text)
    

@app.route('/nlp', methods=['GET', 'POST'])
def nlp():
    if request.method == 'POST':
        if 'file1' not in request.files:
            return "There is no file in the form!"
        
        file1 = request.files['file1']
        if file1.filename == '':
            return "No selected file"
        
        if not allowed_file(file1.filename):
            return "File type not allowed. Please upload a PDF, DOCX, or TXT file."

        filename = secure_filename(file1.filename)
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file1.save(path)

        text = ''
        if file1.filename.lower().endswith('.pdf'):
            text = extract_text_from_pdf(path)
        elif file1.filename.lower().endswith('.docx'):
            text = extract_text_from_docx(path)
        elif file1.filename.lower().endswith('.txt'):
            with open(path, 'r', encoding='utf-8') as txt_file:
                text = txt_file.read()

        # Save the text to a new text file
        text_filename = os.path.splitext(filename)[0] + '.txt'
        text_file_path = os.path.join(app.config['UPLOAD_FOLDER'], text_filename)
        with open(text_file_path, 'w', encoding='utf-8') as txt_file:
            if text == None:
                text="Real"
            else:
                txt_file.write(text)


        

        session['filename_for_html'] = text_filename
        final_filename = 'static/uploads/' + text_filename
        
        # Redirect to the chat page
        return redirect(url_for('chat', filename_html=final_filename))

    return render_template('nlp.html')

@app.route('/chat', methods=['GET', 'POST'])
def chat():


    if request.method == 'POST':
        index = load_data()
        # Process the chat form submission here
        user_input = request.form['userInput']
        # Add your logic to handle the user input and generate a response
        query = user_input
        if query == None:
            result = "Ask me a question about your topic!"
        else:
            result = index.query(query)
        # For demonstration purposes, let's assume you have a response
        response = result
        return render_template('nlp_chat.html', lmao=response)

    return render_template('nlp_chat.html')


@app.route('/transcript',methods=['GET','POST'])
def transcript():
    if request.method == 'POST':
        code_found = request.form.get('code_yt')



            # Create the .data directory if it doesn't exist
        data_dir = "static/uploads"
        os.makedirs(data_dir, exist_ok=True)

        # obtained by the .get_transcript() function
        srt = YouTubeTranscriptApi.get_transcript(code_found)

        # creating or overwriting a file "subtitles.txt" with
        # the info inside the context manager
        subtitles_file_path = os.path.join(data_dir, "subtitles.txt")
        with open(subtitles_file_path, "w") as f:
            # iterating through each element of list srt
            for i in srt:
                # writing each element of srt on a new line
                f.write("{}\n".format(i))

        # Read the content of the .txt file
        with open(subtitles_file_path, 'r') as file:
            content = file.read()

        # Use regex to extract 'text' field from each line
        matches = re.findall(r"'text': '(.*?)'", content)

        # Join the matches into a single string
        transcript = ' '.join(matches)

        # Write the transcript to a new .txt file
        transcript_file_path = "static/uploads/transcript.txt"
        with open(transcript_file_path, 'w') as output_file:
            output_file.write(transcript)

        return redirect(url_for('transcript_chat'))

    return render_template('transcript.html')

  
@app.route('/transcript_chat',methods=['GET','POST'])
def transcript_chat():
    

    if request.method == 'POST':
        index = load_data()
        # Process the chat form submission here
        user_input = request.form['userInput']
        # Add your logic to handle the user input and generate a response
        query = user_input
        if query == None:
            result = "Ask me a question about your topic!"
        else:
            result = index.query(query)
        # For demonstration purposes, let's assume you have a response
        response = result
        return render_template('transcript_chat.html', lmao=response)

    return render_template('transcript_chat.html')

def perform_ocr(image_path):
    # Perform OCR on the image
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_path)
    
    # Extract text from OCR result
    ocr_text = ' '.join([entry[1] for entry in result])
    
    return ocr_text

def query_wolfram_alpha(question):
    # App id obtained from Wolfram Alpha developer portal
    app_id = os.getenv('wolfram')

    # Instance of Wolfram Alpha client class
    client = wolframalpha.Client(app_id)

    # Query Wolfram Alpha with the OCR result
    res = client.query(question)
    return next(res.results).text




@app.route('/mathsolver', methods=['GET', 'POST'])
def mathsolver():
    if request.method == 'POST':
        if 'file2' not in request.files:
            return "There is no file in the form!"

        file2 = request.files['file2']
        if file2.filename == '':
            return "No selected file"

        if not allowed_file(file2.filename):
            return "File type not allowed. Please upload an image file."

        filename = secure_filename(file2.filename)
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        session['filename2'] = filename
        file2.save(path)

        # Perform OCR on the uploaded image
        ocr_output = perform_ocr(path)

        # Use the OCR output as a query to Wolfram Alpha and get the answer
        wolfram_alpha_answer = query_wolfram_alpha(ocr_output)

        return render_template('mathsolver_result.html', ocr_output=ocr_output, wolfram_alpha_answer=wolfram_alpha_answer)

    return render_template('mathsolver.html')




@app.route('/logout')
def logout():
    # Clear user session
    session.pop('user_email', None)
    session.pop('otp_u', None)
    session.pop('username', None)

    # Optionally, you can add a flash message to indicate successful logout
    flash('You have been successfully logged out.', 'success')

    # Redirect to the home or login page
    return redirect(url_for('home'))  # or 'login' if you have a login page




@app.route('/dashboard',methods=['GET','POST'])
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)
