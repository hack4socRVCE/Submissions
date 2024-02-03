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

load_dotenv()

def index(request):
    return render(request, 'index.html')

def esign(request):
        return render(request,'esignature.html')

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
def upload_pdf_main(request):
    if request.method == 'POST':
        try:
            pdf_file = request.FILES['pdf']
            filename = secure_filename(pdf_file.name)
            pdf_path = os.path.join('temp', filename)
            with open(pdf_path, 'wb') as destination:
                for chunk in pdf_file.chunks():
                    destination.write(chunk)
            text = extract_text(pdf_path)
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
