import speech_recognition as sr
import time
import re
from imageCapture import take_pic
def main():
    r=sr.Recognizer()
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source)
        audio=r.listen(source)
        try:
            text=r.recognize_google(audio)
            print(text)
            pattern="friend | friend"
            pattern_qa = "answerbot | answerbot"
            finds=re.findall(pattern,text.lower())
            find_qa = re.findall(pattern_qa,text.lower())
            if len(finds) > 0:
                print("How can I help you :")
                take_pic()
            elif len(find_qa) > 0:
                print("Please ask a question?")
                # Add the function here
            else:
                print("Not Audible!!")
        except Exception as e:
            print(e)

if __name__=="__main__":
    main()