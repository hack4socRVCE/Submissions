
# MeetBot  

Online meetings often lack effective question-and-answer dynamics, hampering professional engagement.
This project introduces an interactive conversational agent, using Large Language Models, to enhance real-time questioning and fosters a more interactive and productive virtual meeting environment for working professionals. The goal is to streamline information retrieval and elevate the quality of online professional interactions.


## Project Highlights

- LLM based question and answer system that will use following:
  - Google Gemini-Pro LLM
  - FAISS embeddings
  - Streamlit for UI
  - Langchain framework
  - FAISS LOCAL STORE as a vector store
  - Few/One shot learning
- In the UI, the meeting participant will ask their questions in natural language, and it will produce the answers accordingly.


## Installation

1.Clone this repository to your local machine using:

```bash
  git clone https://github.com/Skriller18/MeetBot.git
```
2.Navigate to the project directory:

```bash
  cd MeetBot
```
3.Create Environment:

```bash
  conda create -n "myenv" python=3.10.0
```
4. Install the required dependencies using pip:

```bash
  pip install -r requirements.txt
```
5.Acquire an api key through makersuite.google.com and put it in a .env file:

```bash
  GOOGLE_API_KEY="your_api_key_here"
  LAXIS_API_KEY ="your_api_key_here"
```

## Usage

1. Run the Streamlit app by executing:
```bash
streamlit run app_work.py
```

2. The web app will open in your browser where you can ask questions related to the meet:s

## Architecture

![alt text](<WhatsApp Image 2024-02-04 at 03.00.59_112657c9.jpg>)

## Sample Output

![alt text](<WhatsApp Image 2024-02-04 at 10.33.34_3aa0f79c.jpg>)