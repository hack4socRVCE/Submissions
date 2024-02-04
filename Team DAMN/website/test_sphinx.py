from pocketsphinx import LiveSpeech

speech = LiveSpeech()

for phrase in speech:
    print("Recognized: {}".format(phrase))