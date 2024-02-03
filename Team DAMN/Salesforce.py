""" import requests
from PIL import Image
from transformers import BlipProcessor, BlipForQuestionAnswering

processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base")

img_url = 'image1.jpeg' 
raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')

question = "how many bags are in the picture?"
inputs = processor(raw_image, question, return_tensors="pt")

out = model.generate(**inputs)
print(processor.decode(out[0], skip_special_tokens=True))

 """
import requests
from PIL import Image
from transformers import BlipProcessor, BlipForQuestionAnswering

processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base")

while(True):
    print("Enter number :")
    choose=int(input())
    if choose<7 or choose>20 :
        break
    img_path = f'input_images/image{choose}.jpg'  
    raw_image = Image.open(img_path).convert('RGB')

    question = "What and all do u see ?"
    inputs = processor(raw_image, question, return_tensors="pt")

    out = model.generate(**inputs)
    print("Start :")
    print(out)
    print("Answer :")
    print(processor.decode(out[0], skip_special_tokens=True))
