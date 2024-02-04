import os
from dotenv import load_dotenv

load_dotenv()

# Load your API key from the environment variables
google_api_key = "AIzaSyCM6t_MHgoZ2kGz44A8oI_r7SdNDJoCLXk"

# Check if the API key is available
if google_api_key is None:
    raise ValueError("Google API key is missing. Set the environment variable GOOGLE_API_KEY.")

# Now you can use google_api_key in your code
