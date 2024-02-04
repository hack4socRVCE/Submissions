import streamlit as st
import openai
from docx import Document

# OpenAI API key
OPENAI_API_KEY = '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'
openai.api_key = OPENAI_API_KEY

# Streamlit UI
st.title("Text Description Generator")

uploaded_file = st.file_uploader("Choose a file", type=["txt", "docx"])

if uploaded_file is not None:
    # Read file content
    if uploaded_file.type == "text/plain":
        content = uploaded_file.read().decode("utf-8")
    elif uploaded_file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        doc = Document(uploaded_file)
        content = "\n".join([paragraph.text for paragraph in doc.paragraphs])
    else:
        st.error("Unsupported file format. Please upload a TXT or DOCX file.")
        st.stop()

    # Display file content
    st.subheader("File Content:")
    st.text_area("Content", content, height=200)

    # Generate description using OpenAI GPT-3 API
    st.subheader("OpenAI GPT-3 Description:")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": content},
            ]
        )
        description = response['choices'][0]['message']['content']
        st.write(description)
    except Exception as e:
        st.error(f"Error accessing OpenAI GPT-3 API: {e}")
