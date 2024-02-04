from flask import Flask, render_template, request,jsonify
from PIL import Image
import cohere
import gtts
from playsound import playsound
from transformers import BlipProcessor, BlipForQuestionAnswering
import time
import os
import openai
from dotenv import load_dotenv
import os
import pytesseract
import cv2
import PIL.Image

app = Flask(__name__)

processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base")
co = cohere.Client("daZwOk5X5pbxK777ZJEwrksYpykk1Bn1v66OI27e")

openai.api_key = os.getenv("OPENAI_API_KEY")

def perform_visual_question_answering(img_path, question):
    raw_image = Image.open(img_path).convert('RGB')
    inputs = processor(raw_image, question, return_tensors="pt")
    out = model.generate(**inputs)
    answer = processor.decode(out[0], skip_special_tokens=True)
    the_question = f'''Question: {question}
                       Answer: {answer}                        
                        A one word answer has been generated based on the question mentioned above.
                        You have to tell a sentence to expand the word into a single statement based on the question asked.
                        Don't add any new information from your knowledge, the answer should be generated based only on the question and answer.'''
    
    response = co.generate(the_question)    
    return response.generations[0].text
    

def perform_question_answering(question):                       
    # the_question = question    
    # response = co.generate(the_question)    
    # return response.generations[0].text
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo-0613",
        # prompt="Explain Machine Learning to a 5 year old?"
        messages = [{'role':'system', 'content':'Act as an AI assistant'},
                    {'role':'user', 'content':f"Answer the question: {question} in a maximum of 70 words"}]
    )

    return response.choices[0].message.content

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
    
    

def play_audio_answer(text):
    print(text)
    sound = gtts.gTTS(text, lang="en")
    sound.save("trial1.mp3")
    playsound("trial1.mp3")
    os.remove("trial1.mp3")
    
@app.route("/", methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        
        image = request.files['image']
        print(type(image))
        question = request.form['question']

        # Save the uploaded image to a temporary file
        img_path = "temp_image.png"
        image.save(img_path)

        answer = perform_visual_question_answering(img_path, question)
        return jsonify(answer)
        # play_audio_answer(answer)
        
        # answer = perform_question_answering(question)
        # answer = "some text"

        # # Remove the temporary image file
        # import os
        # os.remove(img_path)

        # return render_template('result.html', answer=answer)

    return render_template('upload.html')

@app.route("/questionanswer", methods=['GET', 'POST'])
def home_qa():
    if request.method == 'POST':
        
        question = request.form['question']

        # Save the uploaded image to a temporary file
        # img_path = "temp_image.jpg"
        # image.save(img_path)

        answer = perform_question_answering(question)
        return jsonify(answer)
        # play_audio_answer(answer)
        
        # answer = perform_question_answering(question)
        # answer = "some text"

        # # Remove the temporary image file
        # import os
        # os.remove(img_path)

        # return render_template('result.html', answer=answer)

    return render_template('upload.html')

@app.route("/ocr", methods=['GET', 'POST'])
def home_ocr():
    if request.method == 'POST':
        print("Hello")
        image = request.files['image']

        # Save the uploaded image to a temporary file
        img_path = "temp_image.jpg"
        image.save(img_path)
        print(img_path)
        answer = perform_ocr(img_path)
        return jsonify(answer)
        # play_audio_answer(answer)
        
        # answer = perform_question_answering(question)
        # answer = "some text"

        # # Remove the temporary image file
        # import os
        # os.remove(img_path)

        return render_template('result.html', answer=answer)

    return render_template('upload.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
