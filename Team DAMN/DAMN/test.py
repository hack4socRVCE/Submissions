import speech_recognition as sr
import re
import cv2
import requests
import os
from gtts import gTTS
import playsound as ps
import time
def text_to_speech(text):
    speech = gTTS(text, lang="en")
    speech_file = 'speech1.mp3'
    speech.save(speech_file)
    time.sleep(1)
    ps.playsound(speech_file)
    os.remove(speech_file)

def take_pic():
    text_to_speech("Scanning")
    cam=cv2.VideoCapture(1)
    ret,frame=cam.read()
    if not ret:
        print("Error Capture!!")
        text_to_speech("Error Capture!!")
        return

    img_name=f"opencv_frame_1.png"

    cv2.imwrite(img_name,frame)
    print("ScreenShot taken")
    cam.release()
    cv2.destroyAllWindows()

    with open(img_name, 'rb') as img_file:
        # Prepare the files for the POST request
        files = {'image': (img_name, img_file, 'image/png')}
        url="http://172.17.2.206:8000/"
        try:
            print("Speak now :")
            text_to_speech("Ask Your Question")
            audio=r.listen(source)
            text=r.recognize_google(audio)
            print(text)
            print(f'calling {files}')
            response = requests.post(url,{'question':text},files=files)
            print(response.text)
            text_to_speech(response.text)
        except Exception as e:
            print(e)

def question_answer():
    url="http://172.17.2.206:8000/questionanswer"
    while(1):
        try:
            print("Speak now :")
            text_to_speech("Ask Me Anything")
            audio=r.listen(source)
            text=r.recognize_google(audio)
            print(text)
            pattern = " no | stop | nope "
            finds=re.findall(pattern,text.lower())
            if(len(finds)>0):
                break
            response = requests.post(url,{'question':text})
            print(response.text)
            text_to_speech(response.text)
        except Exception as e:
            print(e)
 # Print the server's response
        print("Server response:")

def ocr_text():
    text_to_speech("Scanning")
    cam=cv2.VideoCapture(1)
    ret,frame=cam.read()
    if not ret:
        print("Error Capture!!")

    img_name=f"opencv_frame_1.png"

    cv2.imwrite(img_name,frame)
    print("ScreenShot taken")
    cam.release()
    cv2.destroyAllWindows()

    with open(img_name, 'rb') as img_file:
        # Prepare the files for the POST request
        files = {'image': (img_name, img_file, 'image/png')}
        url="http://172.17.2.206:8000/ocr"
        text_to_speech("Hold Still")
        try:
            response = requests.post(url,files=files)
            print(response.text)
            text_to_speech(response.text)
        except Exception as e:
            print(e)

r=sr.Recognizer()
text_to_speech("Hello I am your Virtual Eye")
with sr.Microphone() as source:
    r.adjust_for_ambient_noise(source)
    while True:
        text_to_speech("Call Your Assistant")
        audio=r.listen(source)
        try:
            text=r.recognize_google(audio)
            print(text)
            pattern="friend|friend"
            finds=re.findall(pattern,text.lower())
            if len(finds) > 0:
                text_to_speech("Welcome to visual assistance :")
                print("How can I help you :")
                take_pic()
            else:
                pattern2="brother|brother"
                finds2=re.findall(pattern2,text.lower())
                print(finds2)
                if len(finds2) > 0:
                    print("Welcome to Question Answer Session")
                    text_to_speech("How can I QA you :")
                    question_answer()
                else:
                    pattern4="reader|read|rider"
                    finds4=re.findall(pattern4,text.lower())
                    if len(finds4) > 0:
                        print("Scanning :")
                        text_to_speech("Scanning :")
                        ocr_text()
                    else:
                        pattern3="close|stop"
                        finds3=re.findall(pattern3,text.lower())
                        print(finds3)
                        if len(finds3) > 0:
                            text_to_speech("Closing")
                            print("Closing")
                            break
        except Exception as e:
            print(e)