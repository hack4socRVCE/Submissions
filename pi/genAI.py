import vertexai
from vertexai.preview.generative_models import GenerativeModel, Part
from google.oauth2 import service_account
from geopy.geocoders import Nominatim


credentials = service_account.Credentials.from_service_account_file('./creds.json')
vertexai.init( project="enigma-jit", credentials=credentials)


config = {
    "max_output_tokens": 2048,
    "temperature": 0.5,
    "top_p": 1
}
geolocator = Nominatim(user_agent="accident-detector")
	


def getGeminiResponse(prompt : str) -> str:
    model = GenerativeModel("gemini-pro")   # Start a new chat for every prompt or else it gets bored of saying similar things and starts inventing bullshit
    chat = model.start_chat()
    response = chat.send_message(prompt, generation_config=config).candidates[0].content.parts[0].text
    return response

def getAddressFromCoordinates(lat:int, lng:int) -> str:
    location = geolocator.reverse(f"{float(lat)}, {float(lng)}")
    return str(location)
    # return "DTL RVCE Bangalore"

def getPromptFromData(data):
    prompt = "Give a distress message for the following data. Only give the message and nothing else. "
    prompt += "There are people stranded at "
    prompt += getAddressFromCoordinates(data["lat"], data["lon"])
    prompt += "(shorten the address). "
    prompt += "There are " + data['quantity'] + " people among them there are "

    prompt += "women, " if ("women" in data) else ""
    prompt += "children, " if ("children" in data) else ""
    prompt += "disabled people, " if ("disabled" in data) else ""
    prompt += "injured people, " if ("injured" in data) else ""
    
    prompt += ". They really need "
    prompt += "medicines, " if ("medicine" in data) else ""
    prompt += "food, " if ("food" in data) else ""
    prompt += "other help, " if ("other" in data) else ""   # TRY REMOVING
    
    prompt += ". They also mentioned "
    prompt += data['chall']
    
    return prompt


sampleData = {'medical': 'on', 
 'food': 'on', 
 'other': 'on', 

 'quantity': '100', 

 'women': 'on', 
 'children': 'on', 
 'disabled': 'on', 
 'injured': 'on', 

 'chall': 'Disaster Ultra Pro Max', 
 'lat': '12.923311', 
 'lon': '77.497898'}


if __name__ == "__main__":
    prompt = getPromptFromData(sampleData)
    # print(getAddressFromCoordinates(sampleData["lat"], sampleData["lon"]))
    print(getGeminiResponse(prompt))



