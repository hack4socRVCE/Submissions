import streamlit as st
import pandas as pd
import numpy as np
import pandas as pd
import os
import webbrowser
from model import master
import pickle
import speech2text
st.set_page_config(page_title='stockbuddy📈', page_icon="")



placeholder = st.empty()
with placeholder.container():
    st.title("StockBuddy 📈")
    uid = st.text_input("Enter User ID")
    password = st.text_input("Enter Password",type="password")
    
    if not password:
        
            st.stop()

placeholder.empty()
#if st.button("Submit"):


with st.sidebar:
    st.subheader("souces of information")
    url1 = "https://nsdl.co.in/downloadables/pdf/SEBI%20Booklet.pdf"
    if st.button('sebi'):
        webbrowser.open_new_tab(url1)
    url2 = "https://zerodha.com/varsity/modules/"
    url3 = "https://www.bseindia.com/"
    if st.button('bse'):
        webbrowser.open_new_tab(url3)
    if st.button('zerodha varsity'):
        webbrowser.open_new_tab(url2)

    st.header("")
    st.header("")

    st.subheader("invest wizely 💸")
    st.write("deGen.ai")


st.title('StockBuddy 📈')

st.markdown("""
    <span style="font-size:30px">
    what do you want to know about the markets today?
    </span>
    """, unsafe_allow_html=True)

st.header("")
# def quest():
# global flag
lang = ["en-IN", "te-IN", "kn-IN", "hi-IN",
        "ta-IN", "mr-IN", "ml-IN", "gu-IN", "bn-IN"]
l = st.selectbox("choose your preferred language", lang)
# flag=0
text_input = ""
if l == "en-IN":
    text_input = st.text_input("")
    if st.button("ask!"):
        master(text_input,l[0:2])# send data to query engine
        text_answer=''
        with open("temp.txt","rb+") as f:
            text_answer=pickle.load(f)
        st.write("Here's the answer\n:",text_answer)

# quest()
def my_function():
    global flag
    st.write("listening...")
    text = speech2text.extract_audio(l)
    st.write(text)
    master(text,l[0:2])
    text_answer2=''
    with open("temp.txt","rb+") as f:
        text_answer2=pickle.load(f)
    st.write(text_answer2)
    flag=1

if st.button("talk to me!"):
    my_function()