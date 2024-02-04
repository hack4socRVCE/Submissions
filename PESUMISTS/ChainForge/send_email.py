import smtplib
import ssl
from email.message import EmailMessage

SENDER = 'dreampath007@gmail.com'
PASSWORD = 'zlfoppapmyyalavv'

def send_email(receiver , title, id):
    subject = f"Your art work {title} has been taken down!"
    body = f"""
    Dear user,
    We regret to inform you that your art work titled {title} with id {id} has been taken down from our platform due to copyright infringement.
    Kindly refrain from violating terms and conditons of the platform in future to avoid dismissal of the user account.
    
    Regards,
    Team Pesumists
    """
    em = EmailMessage()
    em['From'] = SENDER
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    # Add SSL (layer of security)
    context = ssl.create_default_context()

    # Log in and send the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(SENDER, PASSWORD)
        smtp.sendmail(SENDER, receiver, em.as_string())
        
if __name__=="__main__":
    send_email("karansumbly7@gmail.com","Roronoa Zoro","8")