import streamlit as st
import numpy as np
from PIL import Image
from io import BytesIO
from huggingface_hub import from_pretrained_keras
import requests
import openai
import tensorflow as tf
from keras import backend as K

with open('wave.css') as f:
    css = f.read()
st.markdown(f'<style>{css}</style>', unsafe_allow_html=True)

# Function to load models
@st.cache(allow_output_mutation=True)
def load_updated_models():
    updated_models = {}
    updated_model = from_pretrained_keras("Adaddy1/Hack4Soc")
    updated_model.compile(optimizer='adam', loss='binary_crossentropy')
    updated_models["Adaddy1/Hack4Soc"] = updated_model
    return updated_models

content_loaded = False
if "openai_api_key" not in st.session_state:
    st.markdown("### Input your OpenAI API Key here")
    api_key = st.text_input(label="", placeholder="Enter your API Key here", key="API_input_text")

    if st.button("Load API Key") and api_key.strip() != "":
        st.session_state.openai_api_key = api_key.strip()
        st.success("API Key loaded successfully.")
        content_loaded = True
else:
    content_loaded = True

if content_loaded:

    openai.api_key = st.session_state.openai_api_key

    def updated_generate_image(input_image):
        input_image = input_image.convert("RGB")
        input_image_file = BytesIO()
        input_image.save(input_image_file, format="PNG")
        response = openai.Image.create_variation(
            image=input_image_file.getvalue(),
            n=1,
            size="1024x1024"
        )
        image_url = response['data'][0]['url']
        image_data = requests.get(image_url).content
        return Image.open(BytesIO(image_data))

    # Update the updated_get_prediction function to accept the model's input shape
    def updated_get_prediction(image, model_key, updated_models):
        updated_model = updated_models[model_key]
        input_shape = (180, 180)
        channels_first = False
        model_key = "Updated ResNet Model"
        image = Image.fromarray(image.astype('uint8'), 'RGB').resize(input_shape)
        image = np.array(image).astype(np.float32) / 255

        if channels_first:
            image = np.transpose(image, (2, 0, 1))

        image = np.expand_dims(image, axis=0)

        if channels_first:
            image = np.transpose(image, (0, 2, 3, 1))

        prediction = updated_model.predict(image)
        real_prob = prediction[0][0]
        fake_prob = 1 - real_prob

        if real_prob > fake_prob:
            return model_key, "Real Human Face", real_prob
        else:
            return model_key, "AI Generated Face", fake_prob

    # Load both models at the beginning
    K.set_image_data_format('channels_last')
    updated_models = load_updated_models()

    # Add a new sidebar option for model selection
    updated_model_choice = "Real vs AI Human Face Detection"

    # Streamlit app
    content_loaded = True

    if content_loaded:
        openai.api_key = "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"

        if updated_model_choice.startswith("Real vs AI Human Face Detection"):
            if updated_model_choice.endswith("ResNet Model"):
                model_key = "Adaddy1/Hack4Soc"
                input_shape = (1, 3, 180, 180)

            st.title("AI Detection System")
            st.write("This App will check whether the provided input image is AI generated or real, its been trained on MobileNetV2 Model")
            st.write("")

            uploaded_file = st.file_uploader("Choose an image...", type=["png", "jpg"])

            if uploaded_file is not None:
                uploaded_array = np.array(Image.open(uploaded_file).convert("RGB"))
                input_image = Image.open(uploaded_file)
                new_size = min(input_image.size)
                input_image = input_image.resize((new_size, new_size))
                col1, col2 = st.columns([2, 1])
                col1.image(input_image, use_column_width=True)
                col2.write("Prediction Results:")
                model_key = "Adaddy1/Hack4Soc"
                model_name, prediction, real_prob = updated_get_prediction(uploaded_array, model_key, updated_models)

                real_prob = real_prob
                fake_prob = 1 - real_prob

                real_accuracy = f"This is a Real Human Face ({model_name})"
                real_probability = real_prob

                fake_accuracy = f"This is an AI Generated Face ({model_name})"
                fake_probability = fake_prob

                if real_probability > 0.73:
                    col2.markdown(f"### {real_accuracy}")
                    col2.write(f"Real Probability: {real_probability}")
                else:
                    col2.markdown(f"### {fake_accuracy}")
                    col2.write(f"Real Probability: {fake_probability}")
