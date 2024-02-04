import gtts
from playsound import playsound
import os

def play_audio_answer(text):
    print(text)
    sound = gtts.gTTS(text, lang="en")
    sound.save("trial1.mp3")
    playsound("trial1.mp3")
    os.remove("trial1.mp3")