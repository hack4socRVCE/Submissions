'''import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source:
    print("Say something:")
    audio = r.listen(source)

try:
    text = r.recognize_google(audio)
    print("You said: " + text)
except sr.UnknownValueError:
    print("Could not understand audio")
except sr.RequestError as e:
    print("Could not request results; {0}".format(e))'''


import speech_recognition as sr
from gtts import gTTS
import os

def recognize_speech():
    # Initialize recognizer
    r = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Speak something...")
        # Adjust for ambient noise
        r.adjust_for_ambient_noise(source)
        # Listen for audio input
        audio = r.listen(source)
    
    try:
        print("Recognizing...")
        # Use Google Web Speech API to recognize audio
        text = r.recognize_google(audio)
        print("You said:", text)
        return text
    except sr.UnknownValueError:
        print("Sorry, could not understand audio.")
        return ""
    except sr.RequestError as e:
        print("Error with the service; {0}".format(e))
        return ""

def text_to_speech(text):
    if text:
        # Convert text to speech
        tts = gTTS(text, lang='en', slow=False)  # English language, normal speed
        tts.save("output.mp3")
        # Play the generated audio file
        os.system("mpg123 output.mp3")  # You may need to install mpg123 if not already installed

def main():
    while True:
        # Recognize speech
        text = recognize_speech()
        # Convert recognized text to speech
        text_to_speech(text)

if __name__ == "__main__":
    main()

