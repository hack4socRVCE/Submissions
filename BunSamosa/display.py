import streamlit as st

@st.cache
def get_sidebar_text():
    return "This is some text on the sidebar."

# Main content
st.title("Main Content")
st.write("This is the main content of your app.")

# Sidebar content
st.sidebar.title("Sidebar")
sidebar_text = get_sidebar_text()
st.sidebar.text(sidebar_text)
