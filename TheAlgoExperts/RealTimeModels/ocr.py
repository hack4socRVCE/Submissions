IMG_FILE_PATH = 

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
plt.imshow(cv2.imread(IMG_FILE_PATH))
plt.axis('off')

def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

image = np.array(Image.open(IMG_FILE_PATH))
gray_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
plt.imshow(np.array(gray_img))
plt.axis('off')

def preprocessing(image):
    image = cv2.bitwise_not(image)
    kernel = np.ones((2, 2), np.uint8)
    image = cv2.dilate(image, kernel, iterations = 1)
    image = cv2.bitwise_not(image)
    kernel = np.ones((1, 1), np.uint8)
    image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    image = cv2.bitwise_not(image)
    return (image)

def text_to_speech(text, gender = 1):
    import pyttsx3
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    print(voices)
    engine.setProperty('rate', 140)
    engine.setProperty('voice', voices[gender].id)
    engine.say(text)
    engine.runAndWait()


res_img = (preprocessing(gray_img))
plt.imshow(res_img)

ocr = pytesseract.image_to_string(res_img)
text_to_speech(ocr)