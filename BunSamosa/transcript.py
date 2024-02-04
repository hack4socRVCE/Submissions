import speech_recognition as sr

def transcribe_audio(audio_file):
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)

    try:
        transcript = recognizer.recognize_google(audio_data)
        return transcript
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand the audio.")
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")

if __name__ == "__main__":
    audio_file_path = "path/to/your/audio/file.wav"  # Replace with the path to your audio file

    transcript = transcribe_audio(audio_file_path)

    if transcript:
        print("Transcript:")
        print(transcript)
