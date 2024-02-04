import requests


#_____________________To check the syntax of all api end points visit the following url in any browser.

# http://10.0.2.250:8080

#_____________________Get relevant text from some text
# API endpoint URL
# api_url = "http://10.0.2.250:8080/get_feed"

# # Input data for the POST request
# data = {
#     "query": "What is stress and what is importance of Agni?",
#     "k": 3  # Specify the value of k (Number of chunks of paragraphs you want).
# }

# # Send POST request to the API
# response = requests.post(api_url, json=data)

# # Check if the request was successful (HTTP status code 200)
# if response.status_code == 200:
#     # Display the response from the API
#     print(response.json())
# else:
#     # Display an error message if the request was not successful
#     print(f"Error: {response.status_code} - {response.text}")












# # _____________________STORY TO MORAL
# data = {
#     "story":"""\n8. Attaining the Supreme:- Arjuna asks Krishna seven questions: What is Brahman? What is self? What\nare fruitive activities? What is material manifestation? Who are demigods? Who is the Lord of\nsacrifice? And how can those engaged in devotional service know Krishna at the time of death?\nKrishna replies “brahman” refers to the indestructible living entity (jiva): the “self” refers to\nthe soul’s intrinsic nature of service; and “fruitive activities” means actions that develop\nmaterial bodies. The material manifestation is the ever -changing physical nature; the demigods and\ntheir planets are part of the universal form of the Supreme Lord; and the Lord of sacrifice is\nKrishna Himself as the Super soul. As for knowing Krishna at the time of death, it depends on one’s\nconsciousness. The principle is this: “Whatever state of being one remembers when he quits his\nbody, that state he will attain without fail.” Krishna says, “whoever, at the end of life, quits\nhis body remembering Me alone at once attains My nature without a doubt. Therefore, My dear Arjuna,\nyou should always think of Me in the form of Krishna and at the same time carry out your prescribed\nduty of fighting. With your activities dedicated to Me and your mind and intelligence fixed on Me,\nyou will attain Me without doubt.” During each day of Brahma, all living entities become manifest,\nand during his night they merge into the unmanifested nature. Although there are auspicious and\ninauspicious times for leaving one’s body, devotees of Krishna do not care about them, for by\nengaging in pure devotional service to Krishna they automatically attain all the results derived\nfrom studying the Vedas or engaging in sacrifice, charity, philosophical speculation, and so on.\nSuch pure devotees reach the Lord’s Supreme Eternal Abode."""
# }

# api_url = "https://gigagen.pythonanywhere.com/story_to_moral"
# print("@@@@@@@")
# # Send POST request to the API
# response = requests.post(api_url, json=data)

# # Check if the request was successful (HTTP status code 200)
# if response.status_code == 200:
#     # Display the response from the API
#     print(response.json())
# else:
#     # Display an error message if the request was not successful
#     print(f"Error: {response.status_code} - {response.text}")














# __________________________MORAL to MODERN STORY

# data = {
#     "moral_values":"""1. Dedication and perseverance in scientific research can lead to success and progress.
#         2. Collaboration and sharing of knowledge can lead to innovation and advancement.
#         3. The pursuit of knowledge should be for the betterment of humanity.
#         4. Harnessing the power of technology and nature can bring prosperity and happiness.
#         5. Celebrating and appreciating the achievements of others can inspire further growth and development."""
# }

# api_url = "https://gigagen.pythonanywhere.com/moral_to_modern_story"
# print("@@@@@@@")
# # Send POST request to the API
# response = requests.post(api_url, json=data)

# # Check if the request was successful (HTTP status code 200)
# if response.status_code == 200:
#     # Display the response from the API
#     print(response.json())
# else:
#     # Display an error message if the request was not successful
#     print(f"Error: {response.status_code} - {response.text}")












#_______________________TEXT to SPEECH
    
# import requests
# import json
# import pygame

# # URL of the text_to_speech endpoint
# url = "https://gigagen.pythonanywhere.com/text_to_speech"  # Change the URL accordingly

# # Example text data
# text_data = {
#     "story": "Hello, this is a test text for text-to-speech conversion."
# }

# # Send a POST request to the endpoint
# response = requests.post(url, json=text_data)

# # Check the response status code
# if response.status_code == 200:
#     # Save the received audio file
#     with open("received_speech.mp3", "wb") as file:
#         file.write(response.content)
#     print("Speech file received successfully.")

#     # Play the received audio file
#     pygame.mixer.init()
#     pygame.mixer.music.load("received_speech.mp3")
#     pygame.mixer.music.play()

#     # Wait until the playback finishes
#     while pygame.mixer.music.get_busy():
#         pygame.time.Clock().tick(10)
# else:
#     print(f"Failed to get speech file. Status code: {response.status_code}")
#     print(response.text)












# _____________________________________ text to image

# data = {
#     "prompt": "A colorful abstract painting",
#     "size": "1024x1024",
#     "quality": "standard",
#     "n": 1
# }
# api_url = "http://10.0.2.250:8080/generate_image"
# print("@@@@@@@")
# # Send POST request to the API
# response = requests.post(api_url, json=data)

# # Check if the request was successful (HTTP status code 200)
# if response.status_code == 200:
#     # Display the response from the API
#     print(response.json())
# else:
#     # Display an error message if the request was not successful
#     print(f"Error: {response.status_code} - {response.text}")







# data = {
# 'query': "How to manage worklife balance?",
# }

# api_url = "http://172.16.64.165:8080/children_stories"
# print("@@@@@@@")

# # Send POST request to the API
# response = requests.post(api_url, json=data)

# # Check if the request was successful (HTTP status code 200)
# if response.status_code == 200:
#     # Display the response from the API
#     print(response.json())
# else:
#     # Display an error message if the request was not successful
#     print(f"Error: {response.status_code} - {response.text}")


data = {
'query': "What is this website for?",
}

api_url = "https://gigagen.pythonanywhere.com/website_chatbot"
print("@@@@@@@")

# Send POST request to the API
response = requests.post(api_url, json=data)

# Check if the request was successful (HTTP status code 200)
if response.status_code == 200:
    # Display the response from the API
    print(response.json())
else:
    # Display an error message if the request was not successful
    print(f"Error: {response.status_code} - {response.text}")
