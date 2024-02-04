import psycopg2
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify

class User:
    def __init__(self, fullName, password, email, phone):
        self.fullName = fullName
        self.password = password  # Make sure to hash the password in production
        self.email = email
        self.phone = phone
        self.is_authenticated = False

        # Establish a connection to the PostgreSQL database
        self.connection = psycopg2.connect(
            user="your_username",
            password="your_password",
            host="your_host",
            port="your_port",
            database="your_database"
        )
        self.cursor = self.connection.cursor()

    def registerUser(self, otp):
        # Perform user registration logic and insert into the temporary registration table
        insert_query = """
        INSERT INTO temp_users (full_name, password, email, phone, otp) 
        VALUES (%s, %s, %s, %s, %s);
        """
        self.cursor.execute(insert_query, (self.fullName, self.password, self.email, self.phone, otp))
        self.connection.commit()

    def send_otp_email(self, otp):
        # Send OTP to user's email
        # Set up your SMTP server and replace with your details
        sender_email = "your_email@example.com"
        receiver_email = self.email
        password = "your_password"

        message = MIMEMultipart("alternative")
        message["Subject"] = "Your OTP"
        message["From"] = sender_email
        message["To"] = receiver_email

        # Create the plain-text and HTML version of your message
        text = f"Hi {self.fullName},\nHere is your OTP: {otp}"
        html = f"""\
        <html>
          <body>
            <p>Hi {self.fullName},<br>
               Here is your OTP: <b>{otp}</b>
            </p>
          </body>
        </html>
        """

        # Turn these into plain/html MIMEText objects
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part1)
        message.attach(part2)

        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.example.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )


def register_user():
    data = request.json
    user = User(data['fullName'], data['password'], data['email'], data['phone'])
    
    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)
    
    # Register the user with OTP
    user.registerUser(otp)
    
    # Send OTP via email
    user.send_otp_email(otp)
    

def verify_otp():
    data = request.json
    otp = data['otp']
    email = data['email']
    
    # Verify the OTP (implement your logic here)
    # If OTP is correct, move data to the main user table and complete registration
    # Respond to frontend
