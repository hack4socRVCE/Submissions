import os
from io import BytesIO
from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from xhtml2pdf import pisa
from pdfminer.high_level import extract_text
from werkzeug.utils import secure_filename
from . import langchain_gemini_utils as lg
from dotenv import load_dotenv
import json
# import fitz
import PyPDF2

load_dotenv()

target_text="signature"
image_path = "temp\\"

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