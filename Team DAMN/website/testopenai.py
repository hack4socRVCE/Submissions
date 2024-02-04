import openai
from dotenv import load_dotenv
import os


openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.chat.completions.create(
    model="gpt-3.5-turbo-0613",
    # prompt="Explain Machine Learning to a 5 year old?"
    messages = [{'role':'system', 'content':'Act as an AI assistant'},
                {'role':'user', 'content':'What are 5 scholarship options available for blind students in India?in a maximum of 100 words'}]
)

print(response.choices[0].message.content)

