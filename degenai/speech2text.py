import speech_recognition as sr


def extract_audio(l):
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak Anything:")
        audio = r.listen(source)
        try:
            text = r.recognize_google(audio, language=l)  # for Hindi
            print("You said: {}".format(text))
            return text
        except:
            print("Sorry could not recognize your voice")