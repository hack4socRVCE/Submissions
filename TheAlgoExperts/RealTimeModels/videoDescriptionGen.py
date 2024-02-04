import matplotlib.pyplot as plt
import cv2
from PIL import Image
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torchx

model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
max_length = 20
num_beams = 8
gen_kwargs = {"max_length": max_length, "num_beams": num_beams}


def text_to_speech(text, gender = 1):
    import pyttsx3
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    print(voices)
    engine.setProperty('rate', 140)
    engine.setProperty('voice', voices[gender].id)
    engine.say(text)
    engine.runAndWait()

def predict_step(img_array):
    img_tensor = torch.from_numpy(img_array)
    img_tensor = img_tensor.unsqueeze(0)
    pixel_values = feature_extractor(images = img_tensor, return_tensors = "pt").pixel_values
    pixel_values = pixel_values.to(device)
    output_ids = model.generate(pixel_values, **gen_kwargs)
    preds = tokenizer.batch_decode(output_ids, skip_special_tokens = True)
    preds = [pred.strip() for pred in preds]
    return  preds

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    frame = cv2.resize(frame, (224, 224))
    preds = predict_step(frame)
    print(preds)
    text_to_speech(preds)
    cv2.imshow("Screen", frame)
    if cv2.waitKey(1) & 0xFF == ord('s'):
        break
cap.release()
cv2.destroyAllWindows()