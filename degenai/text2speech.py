from gtts import gTTS  
from playsound import playsound  
  
# It is a text value that we want to convert to audio  
#text_val = 'ಪ್ರಾಂಪ್ಟ್ ಟೆಂಪ್ಲೇಟ್ ಎಂದರೆ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರ ನೀಡಲು ಬಳಸುವ ಒಂದು ಆಕಾರದ ಟೆಂಪ್ಲೇಟ್ ಆಗಿದೆ. ಇದು ಪ್ರಶ್ನೆಯನ್ನು ಹೊಂದಿರುವುದು ಮತ್ತು ಉತ್ತರವನ್ನು ನಿರ್ಮಿಸುವುದರಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಇದು ಪ್ರಾಮುಖ್ಯವಾಗಿ ಪ್ರಾಮ್ಯಂತರ ಇಂಜಿನಿಯರಿಂಗ್ ಮೂಲಕ ಪ್ರಶ್ನೆಗಳನ್ನು ನಿರ್ಮಿಸುವುದಕ್ಕೆ ಬಳಸಲ್ಪಡುತ್ತದೆ. ಇದು ಪ್ರಶ್ನೆಗೆ ಉತ್ತರ ನೀಡುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸುಲಭಗೊಳಿಸುತ್ತದೆ.'.encode(str="utf-16") 
  
# Here are converting in English Language 
def txt2speech(text,l):

    #language = 'kn'  
    
    # Passing the text and language to the engine,  
    # here we have assign slow=False. Which denotes  
    # the module that the transformed audio should  
    # have a high speed  
    obj = gTTS(text=text, lang=l, slow=False)  
    
    #Here we are saving the transformed audio in a mp3 file named  
    # exam.mp3  
    obj.save(r"C:\Users\Akhil Reddy N\kodikon-degenai\Input\ai.wav")