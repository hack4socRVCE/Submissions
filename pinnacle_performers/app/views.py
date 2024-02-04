import os
from io import BytesIO
from django.http import HttpResponse, FileResponse
from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from xhtml2pdf import pisa
from pdfminer.high_level import extract_text
from werkzeug.utils import secure_filename
from . import langchain_gemini_utils as lg
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from dotenv import load_dotenv
import json
# import fitz
import PyPDF2
from reportlab.pdfgen import canvas
from PyPDF2 import PdfReader, PdfWriter
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
import requests
from django.core.mail import EmailMessage
from django.shortcuts import render
from django.template.loader import render_to_string
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


smtp_host = 'http://smtp.gmail.com'
smtp_port = 587
smtp_user = 'vishal.p.2304@gmail.com'
smtp_pass = 'nksh fftm lqjh yhbf'
load_dotenv()

subject="Generated PDF from Pinnacle-Docs"
target_text="signature"
image_path = "temp/"

def send_pdf_email(request):
    if request.method == 'POST':
        recipient_email = request.POST.get('recipient_email')
        
        sender_email = smtp_user
        pdf_file_path = 'C:\\Users\\Ganeshdarshan Bhat\\Downloads\\test12.pdf'
        
        subject = 'PDF Document'
        message = 'Please find the attached PDF document.'
        from_email = 'Your Name <{}>'.format(sender_email)
        recipient_list = [recipient_email]
        try:
            # Create an EmailMessage object
            email = EmailMessage(subject, message, from_email, recipient_list)
            
            # Attach the PDF file
            email.attach_file(pdf_file_path)
            
            # Send the email
            email.send("bhatganeshdarshan10@gmail.com")
            
            return HttpResponse('Email sent successfully.')
        except Exception as e:
            return HttpResponse('Email sending failed. Error: {}'.format(str(e)))
    
    return render(request, 'your_template.html')  # Replace 'your_template.html' with your actual template



def index(request):
    return render(request, 'index.html')

def esign(request):
        return render(request,'esignature.html')

def home(request):
    return render(request,'home.html')

def register(request):
    return render(request,'auth-register-basic.html')

def login(request):
    return render(request,'auth-login-basic.html')

def forgot_password(request):
    return render(request,'auth-forgot-password-basic.html')

def signtype(request):
    return render(request,'signtype.html')



def upload_pdf_main(request):
    if request.method == 'POST' and request.FILES['pdf']:
        myfile = request.FILES['pdf']
        fs = FileSystemStorage(location=os.path.join(settings.BASE_DIR, 'static'))  # Customize the location
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        original_pdf_path = os.path.join(settings.BASE_DIR, 'static', filename)
        # Pass the pdf_path as a parameter to the template
        return render(request, 'request_sign.html', {'pdf_path': original_pdf_path})
    else:
        return render(request,'upload_pdf.html')

def my_drive(request):
    return render(request,'my_drive.html')

def send_pdf_email(request):
    if request.method == 'POST':
        recipient_email = request.POST.get('recipient_email')
        recipient_email="bhatganeshdarshan10@gmail.com"
        # Replace these variables with your own values
        sender_email = 'vishal.p.2304@gmail.com'
        pdf_file_path = 'C:\\Users\\Ganeshdarshan Bhat\\Downloads\\test12.pdf'
        
        subject = 'PDF Document'
        message = 'Please find the attached PDF document.'
        from_email = 'Your Name <{}>'.format(sender_email)
        recipient_list = [recipient_email]
        email = EmailMessage(subject, message, from_email, recipient_list)
        # email.attach_file(pdf_file_path)
        email.send(recipient_list)
        return HttpResponse('Email sent successfully.')
    return render(request, 'index')

@csrf_exempt
def generate_pdf(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            html_content = json_data.get('html_content')
            pdf_file = BytesIO()
            pisa.CreatePDF(BytesIO(html_content.encode('utf-8')), dest=pdf_file)
            pdf_data = pdf_file.getvalue()
            pdf_file.close()
            
            response = HttpResponse(pdf_data, content_type='application/pdf')
            response['Content-Disposition'] = 'inline; filename=output.pdf'
            return response
        except Exception as e:
            return HttpResponse(str(e), status=500)
    else:
        return HttpResponse("Method not allowed", status=405)

@csrf_exempt
def upload_pdf(request):
    if request.method == 'POST':
        try:
            pdf_file = request.FILES['pdf']
            filename = secure_filename(pdf_file.name)
            pdf_path = os.path.join('temp', filename)
            with open(pdf_path, 'wb') as destination:
                for chunk in pdf_file.chunks():
                    destination.write(chunk)
            text = extract_text(pdf_path)
            add_image_to_pdf(pdf_path,image_path,target_text)
            os.remove(pdf_path)
            return HttpResponse(text)
        except Exception as e:
            return HttpResponse(str(e), status=500)
    else:
        return HttpResponse("Method not allowed", status=405)

@csrf_exempt
def paraphrase_route(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            text = json_data.get('text')
            paraphrased_text = lg.paraphrase(text)
            return HttpResponse(paraphrased_text)
        except Exception as e:
            return HttpResponse(str(e), status=500)
    else:
        return HttpResponse("Method not allowed", status=405)

@csrf_exempt
def summarise_route(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            text = json_data.get('text')
            summarized_text = lg.summarise(text)
            return HttpResponse(summarized_text)
        except Exception as e:
            return HttpResponse(str(e), status=500)
    else:
        return HttpResponse("Method not allowed", status=405)


def find_text_coordinates(pdf_path, target_text):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages =  len(reader.pages)

        for page_num in range(num_pages):
            page =  reader.pages[page_num]
            text = page.extract_text()
            text_lines = text.split('\n')

            for line_num, line in enumerate(text_lines):
                if target_text in line:
                    x = page.mediabox.lower_left[0]
                    y = page.mediabox.lower_left[1] + (line_num * 12)
                    print(f"Text '{target_text}' found on page {page_num + 1} at coordinates ({x}, {y})")
                    # add_image_to_pdf(pdf_path,image_path,target_text)
                    return x,y
    return []



def add_image_to_pdf(pdf_path, image_path, target_text):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        writer = PyPDF2.PdfReader(file)

        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            writer.addPage(page)

            text = page.extract_text()
            if target_text in text:
                x, y = find_text_coordinates(pdf_path, target_text)
                image = PyPDF2.PdfImageXObject(image_path)
                page.merge_page(image, (x, y)) 

        with open('output.pdf', 'wb') as output_file:
            writer.write(output_file)

def add_signature_page(pdf_path, signature_image_path):
    # Open the original PDF file
    pdf_file = open(pdf_path, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)

    # Create a new PDF file to save the modified content
    output_pdf = PyPDF2.PdfFileWriter()

    # Copy all existing pages to the new PDF file
    for page_num in range(pdf_reader.getNumPages()):
        page = pdf_reader.getPage(page_num)
        output_pdf.addPage(page)

    # Add a new blank page to the PDF
    new_page = PyPDF2.pdf.PageObject.createBlankPage(width=595, height=842)  # A4 page size
    output_pdf.addPage(new_page)

    # Add the signature image to the new page
    with open(signature_image_path, 'rb') as signature_image_file:
        image = PyPDF2.PdfFileReader(signature_image_file)
        new_page.mergeTranslatedPage(image.getPage(0), 0, 0)
    # Save the modified PDF to a new file
    modified_pdf_path = os.path.join(settings.BASE_DIR, 'static', 'modified.pdf')
    with open(modified_pdf_path, 'wb') as modified_pdf_file:
        output_pdf.write(modified_pdf_file)

    pdf_file.close()

    return modified_pdf_path


def create_signature_overlay(overlay_path):
    c = canvas.Canvas(overlay_path, pagesize=(595, 842))  # A4 size
    # Draw a rectangle as the signature box
    # Adjust the coordinates (100, 100) and size (300, 100) as needed
    c.rect(100, 100, 100, 50, stroke=1, fill=0)
    c.drawString(100, 75, "Sign Here:")  # Label for the signature box
    c.save()


def add_signature_box_to_pdf(original_pdf_path, overlay_pdf_path, output_pdf_path):
    # Create a PDF reader for the original and overlay PDFs
    original_pdf = PdfReader(original_pdf_path)
    overlay_pdf = PdfReader(overlay_pdf_path)
    
    # Create a PDF writer for the output PDF
    writer = PdfWriter()

    # Iterate through each page of the original PDF
    for page_number in range(len(original_pdf.pages)):
        # Get the page from the original PDF to which you want to add the signature box
        page = original_pdf.pages[page_number]
        
        # Merge the overlay onto this page
        page.merge_page(overlay_pdf.pages[0])
        
        # Add the modified page to the writer
        writer.add_page(page)
    
    # Write to a new output PDF
    with open(output_pdf_path, 'wb') as out:
        writer.write(out)

# Paths for your files
def file_upload(request):
    if request.method == 'POST' and request.FILES['file']:
        # Never trust user input!
        myfile = request.FILES['file']
        fs = FileSystemStorage(location=os.path.join(settings.BASE_DIR, 'static'))  # Customize the location
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = request.build_absolute_uri(fs.url(filename))
        # add the signature box to the uploaded PDF
        overlay_pdf_path = os.path.join(settings.BASE_DIR, 'static', 'signature_overlay.pdf')
        # Create the signature overlay pdf file
        with open(overlay_pdf_path, 'wb') as f:
            f.write(b'')
        create_signature_overlay(overlay_pdf_path)
        output_pdf_path = os.path.join(settings.BASE_DIR, 'static', 'signed_pdf.pdf')
        with open(output_pdf_path, 'wb') as f:
            f.write(b'')
        original_pdf_path = os.path.join(settings.BASE_DIR, 'static', filename)
        add_signature_box_to_pdf(original_pdf_path, overlay_pdf_path, output_pdf_path)
        
        # send the url of the file to the client email, use "https://sendmail-api-docs.vercel.app/api/send" API
        data = {
            "to": request.POST.get('email'),
            "subject": "Signed PDF",
            "message": "Your signed PDF is ready for download"+uploaded_file_url,
        }
        response = requests.post('https://sendmail-api-docs.vercel.app/api/send', json=data)
        return JsonResponse({'message': 'File uploaded and signed successfully!'})
    return render(request, 'upload_pdf.html')
