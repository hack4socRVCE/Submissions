import pytesseract
import PIL.Image
import openai
from dotenv import load_dotenv
import os


openai.api_key = os.getenv("OPENAI_API_KEY")

def perform_ocr(img_path):
    print(img_path)
    
    text = pytesseract.image_to_string(PIL.Image.open(img_path))
    print(text)
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo-0613",
        
        messages = [{'role':'system', 'content':'Your job is to extract meaningful text from the following text'},
                    {'role':'user', 'content':f"Extract the meaningful text from the message: {text}"}]
    )
    
    

    return response.choices[0].message.content
 
perform_ocr('input_images\ocr_text_1.jpeg')
 