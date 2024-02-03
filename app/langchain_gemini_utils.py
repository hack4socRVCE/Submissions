import google.generativeai as genai
import os, json, base64, logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from flask import flash
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('API_KEY') # Your API key here

logger = logging.getLogger(__name__)

model = 'gemini-pro'
generation_config_b64 = 'eyJ0ZW1wZXJhdHVyZSI6MC43LCJ0b3BfcCI6MC44LCJ0b3BfayI6NDAsIm1heF9vdXRwdXRfdG9rZW5zIjoyMDAwMCwic3RvcF9zZXF1ZW5jZXMiOltdfQ=='
safety_settings_b64 = 'W3siY2F0ZWdvcnkiOiJIQVJNX0NBVEVHT1JZX0hBUkFTU01FTlQiLCJ0aHJlc2hvbGQiOiJCTE9DS19PTkxZX0hJR0gifSx7ImNhdGVnb3J5IjoiSEFSTV9DQVRFR09SWV9IQVRFX1NQRUVDSCIsInRocmVzaG9sZCI6IkJMT0NLX09OTFlfSElHSCJ9LHsiY2F0ZWdvcnkiOiJIQVJNX0NBVEVHT1JZX1NFWFVBTExZX0VYUExJQ0lUIiwidGhyZXNob2xkIjoiQkxPQ0tfT05MWV9ISUdIIn0seyJjYXRlZ29yeSI6IkhBUk1fQ0FURUdPUllfREFOR0VST1VTX0NPTlRFTlQiLCJ0aHJlc2hvbGQiOiJCTE9DS19PTkxZX0hJR0gifV0='
question_prompt_template = "UGxlYXNlIHByb3ZpZGUgYSBzdW1tYXJ5IG9mIHRoZSBmb2xsb3dpbmcgdGV4dC5SZXR1cm4geW91ciByZXNwb25zZSBpbiBwYXJ0cyBzZXBhcmF0ZWQgYnkgaW5kaXZpZHVhbCBoZWFkaW5ncyB0aGF0IGNvdmVycyB0aGUga2V5IHBvaW50cyBvZiB0aGUgdGV4dC4gCiAgICAgICAgICAgICAgICAgIERvIE5PVCB1c2UgbWFya2Rvd24gZm9ybWF0LiBEbyBub3QgbWFrZSBzdW1tYXJ5IHRvbyBzaG9ydC4KICAgICAgICAgICAgICAgICAgVEVYVDoge3RleHR9CiAgICAgICAgICAgICAgICAgIFNVTU1BUlk6"
refine_prompt_template = "IllvdXIgam9iIGlzIHRvIHByb2R1Y2UgYSBmaW5hbCBzdW1tYXJ5XG4iCiAgICAiV2UgaGF2ZSBwcm92aWRlZCBhbiBleGlzdGluZyBzdW1tYXJ5IHVwIHRvIGEgY2VydGFpbiBwb2ludDoge2V4aXN0aW5nX2Fuc3dlcn1cbiIKICAgICJXZSBoYXZlIHRoZSBvcHBvcnR1bml0eSB0byByZWZpbmUgdGhlIGV4aXN0aW5nIHN1bW1hcnkiCiAgICAiKG9ubHkgaWYgbmVlZGVkKSB3aXRoIHNvbWUgbW9yZSBjb250ZXh0IGJlbG93LlxuIgogICAgIi0tLS0tLS0tLS0tLVxuIgogICAgInt0ZXh0fVxuIgogICAgIi0tLS0tLS0tLS0tLVxuIgogICAgICAgICAgICAgIFJldHVybiB5b3VyIHJlc3BvbnNlIGluIHBhcnRzIHNlcGFyYXRlZCBieSBpbmRpdmlkdWFsIGhlYWRpbmdzIHRoYXQgY292ZXJzIHRoZSBrZXkgcG9pbnRzIG9mIHRoZSB0ZXh0LiBEbyBOT1QgdXNlIG1hcmtkb3duIGZvcm1hdC4gRG8gbm90IG1ha2UgdGhlIHN1bW1hcnkgdG9vIHNob3J0CiAgICAgICAgICAgICAgU1VNTUFSWTo="
generation_config = json.loads(base64.b64decode(generation_config_b64))
safety_settings = json.loads(base64.b64decode(safety_settings_b64))
question_prompt_template = base64.b64decode(question_prompt_template)
refine_prompt_template = base64.b64decode(refine_prompt_template)
genai.configure(api_key=API_KEY)
llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=API_KEY, \
                                 safety_settings=safety_settings, generation_config=generation_config)

def paraphrase(text):
    try:
        contents_ = "Your job is to paraphrase the given texts into easier language. Your output should only contain the paraphrased text, no other text, not a thing unrelated, not even inverted commas. Paraphrase : \"{}\" ".format(text)
        gemini = genai.GenerativeModel(model_name=model)
        response = gemini.generate_content(
            contents_,
            generation_config=generation_config,
            safety_settings=safety_settings,
            stream=False)
        return response.candidates[0].content.parts[0].text
    except Exception as e:
        logger.error('Text not paraphrased due to an error : {}'.format(str(e)))
        return text

def summarise(text):
    try:
        text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=10000, chunk_overlap=1000
        )
        split_docs = text_splitter.split_text(text)
        split_docs = [Document(page_content=t) for t in split_docs]
        question_prompt = PromptTemplate(
        template=question_prompt_template, input_variables=["text"]
        )
        refine_prompt = PromptTemplate(
        template=refine_prompt_template, input_variables=["text"]
        )
        refine_chain = load_summarize_chain(
        llm,
        chain_type="refine",
        question_prompt=question_prompt,
        refine_prompt=refine_prompt,
        return_intermediate_steps=False
        )
        result = refine_chain({"input_documents": split_docs}, return_only_outputs=True)
        return result["output_text"]
    except Exception as e:
        logger.error('Text not summarised due to an error : {}'.format(str(e)))
        return text