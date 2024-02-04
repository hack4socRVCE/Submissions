import streamlit as st
import requests

# Gemini API endpoint
GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCM6t_MHgoZ2kGz44A8oI_r7SdNDJoCLXk'

# Set your Gemini API key here
GEMINI_API_KEY = 'AIzaSyCM6t_MHgoZ2kGz44A8oI_r7SdNDJoCLXk'

# Streamlit app
def main():
    st.title("Transcript Description with Gemini API")

    # File upload
    uploaded_file = st.file_uploader("Upload a transcript text file", type=["txt"])

    if uploaded_file is not None:
        # Read the content of the file as a string
        transcript_text = uploaded_file.read().decode("utf-8")

        # Display the uploaded content
        st.subheader("Transcript Content:")
        st.text(transcript_text)

        # Button to generate description
        if st.button("Generate Description"):
            # Call Gemini API to generate description
            description = generate_description(transcript_text)

            # Display the generated description
            st.subheader("Generated Description:")
            st.text(description)

# Function to call Gemini API
def generate_description(transcript_text):
    headers = {
        'Content-Type': 'D:\Projects\MeetBot\client_secret_76432363970-9t717ot759mu7jcm796hfa2pkp3jmirl.apps.googleusercontent.com.json',
        'Authorization': f'Bearer {GEMINI_API_KEY}'
    }

    # Use prompt as a list of strings
    prompt = [transcript_text]

    data = {
        'model': 'gemini-pro',
        'prompt': prompt,
        'max_tokens': 150
    }

    response = requests.post(GEMINI_API_URL, json=data, headers=headers)
    response_data = response.json()

    ##if 'choices' in response_data and response_data['choices']:
    return response_data
    ##else:
        ##return "Error generating description"

# Run the Streamlit app
if __name__ == '__main__':
    main()
