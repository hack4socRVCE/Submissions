import os
from io import BytesIO
from django.http import HttpResponse
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

load_dotenv()

target_text="signature"
image_path = "temp/"

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
            # coordinate_list=find_text_coordinates(pdf_path,target_text) #here 
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
@csrf_exempt  # For simplicity, you might want to handle CSRF properly in production
def file_upload(request):
    if request.method == 'POST' and request.FILES['file']:
        # Never trust user input!
        myfile = request.FILES['file']
        fs = FileSystemStorage(location=os.path.join(settings.BASE_DIR, 'static'))  # Customize the location
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return JsonResponse({'status': 'success', 'url': uploaded_file_url})
    return JsonResponse({'status': 'error'})
