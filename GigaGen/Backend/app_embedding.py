from flask import Flask, request, jsonify
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from transformers import DistilBertModel, DistilBertTokenizer
import torch
import numpy as np
from flask_cors import CORS  # Import the CORS class

app = Flask(__name__)
CORS(app) 

# Update the list with paths of your text files
file_paths = [
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\leo_tolstoy_char_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\others_chars_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\Ramayana_chars_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\Jataka_tales_11_chars_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\panchatantra_top25_char_100.txt",
]


model_name = "distilbert-base-uncased"
tokenizer = DistilBertTokenizer.from_pretrained(model_name)
model = DistilBertModel.from_pretrained(model_name)


# Initialize variables
paragraphs = []

# Read content from each file and append to paragraphs
for file_path in file_paths:
    with open(file_path, 'r', encoding='utf-8') as file:
        paragraphs.extend(file.read().split('\n\n'))

# Combine paragraphs with 2 lines space in between
combined_text = '\n\n'.join(paragraphs)

# Using the same text splitter for each paragraph
rect_text_splitter = RecursiveCharacterTextSplitter(
    chunk_overlap=0,
    length_function=len,
)

chunks = []
for paragraph in paragraphs:
    # Set the chunk size to the length of the paragraph
    rect_text_splitter.chunk_size = len(paragraph)
    current_chunks = rect_text_splitter.split_text(paragraph)
    chunks.extend(current_chunks)

#_________________________________________________


import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords')
nltk.download('punkt')

# model_name = "distilbert-base-uncased"
# tokenizer = DistilBertTokenizer.from_pretrained(model_name)
# model = DistilBertModel.from_pretrained(model_name)

# Function to find the paragraph with the highest word occurrences
def find_paragraph_with_highest_occurrences_ancient(query, paragraphs):
    max_occurrences = 0
    max_occurrences_paragraph = ""

    for paragraph in paragraphs:
        # Remove stopwords from the paragraph
        paragraph_without_stopwords = remove_stopwords(paragraph)
        
        # Tokenize the query and paragraph
        query_tokens = set(word_tokenize(query))
        paragraph_tokens = word_tokenize(paragraph_without_stopwords.lower())

        # Calculate word occurrences
        occurrences = sum(1 for word in paragraph_tokens if word in query_tokens)

        # Update max occurrences paragraph if needed
        if occurrences > max_occurrences:
            max_occurrences = occurrences
            max_occurrences_paragraph = paragraph

    return max_occurrences_paragraph, max_occurrences

def find_paragraph_with_highest_occurrences_children(query, paragraphs):
    max_occurrences = 0
    max_occurrences_paragraph = ""

    for paragraph in paragraphs:
        # Remove stopwords from the paragraph
        paragraph_without_stopwords = remove_stopwords(paragraph)
        
        # Tokenize the query and paragraph
        query_tokens = set(word_tokenize(query))
        paragraph_tokens = word_tokenize(paragraph_without_stopwords.lower())

        # Calculate word occurrences
        occurrences = sum(1 for word in paragraph_tokens if word in query_tokens)

        # Update max occurrences paragraph if needed
        if occurrences > max_occurrences:
            max_occurrences = occurrences
            max_occurrences_paragraph = paragraph

    return max_occurrences_paragraph, max_occurrences


# Function to remove stopwords from a given text
def remove_stopwords(text):
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text)
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return ' '.join(filtered_words)

# Load the first text file
text_file_path_1 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\BhagavadGita_chars_100.txt"
with open(text_file_path_1, 'r', encoding='utf-8') as file:
    paragraphs_1 = file.read().split('\n\n')
    # print(paragraphs_1)

# Load the second text file
text_file_path_2 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\leo_tolstoy_char_100.txt"
with open(text_file_path_2, 'r', encoding='utf-8') as file:
    paragraphs_2 = file.read().split('\n\n')

# Load the first text file
text_file_path_3 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\Mahabaratha_char_100.txt"
with open(text_file_path_3, 'r', encoding='utf-8') as file:
    paragraphs_3 = file.read().split('\n\n')

# Load the second text file
text_file_path_4 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\others_chars_100.txt"
with open(text_file_path_4, 'r', encoding='utf-8') as file:
    paragraphs_4 = file.read().split('\n\n')

# Load the first text file
text_file_path_5 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\Ramayana_chars_100.txt"
with open(text_file_path_5, 'r', encoding='utf-8') as file:
    paragraphs_5 = file.read().split('\n\n')


# Combine paragraphs from both files
paragraphs_ancient = paragraphs_1 + paragraphs_2 + paragraphs_3 + paragraphs_4 + paragraphs_5


# Load the first text file
text_file_path_1 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\panchatantra_top25_char_100.txt"
with open(text_file_path_1, 'r', encoding='utf-8') as file:
    paragraphs_1_child = file.read().split('\n\n')

# Load the second text file
text_file_path_2 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\Jataka_tales_11_chars_100.txt"
with open(text_file_path_2, 'r', encoding='utf-8') as file:
    paragraphs_2_child = file.read().split('\n\n')

# Combine paragraphs from both files
paragraphs_children = paragraphs_1_child + paragraphs_2_child

def get_embeddings(text):
    tokens = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**tokens)
    embeddings = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embeddings

chunk_embeddings = [get_embeddings(chunk) for chunk in chunks]

def find_k_nearest(query, chunk_embeddings, k=3):
    query_embedding = get_embeddings(query)
    similarities = [np.dot(query_embedding, chunk_embedding) / 
                    (np.linalg.norm(query_embedding) * np.linalg.norm(chunk_embedding))
                    for chunk_embedding in chunk_embeddings]
    top_k_indices = np.argsort(similarities)[-k:][::-1]
    top_k_chunks = [chunks[i] for i in top_k_indices]
    top_k_scores = [similarities[i] for i in top_k_indices]
    return top_k_chunks, top_k_scores

def get_endpoints_info():
    endpoints_info = {
        '/': {
            'methods': ['GET'],
            'description': 'You are here, it will give a description of all available endpoints',
        },
        '/welcome': {
            'methods': ['GET'],
            'description': 'Welcome message',
            'example_request': None,
            'example_response': {'welcome': 'Welcome'}
        },
        '/get_feed': {
            'methods': ['POST'],
            'description': 'Get feed based on query',
            'example_request': {'query': 'your_query_here', 'k': 3},
            'example_response': {'feed': 'your_generated_feed_here'}
        },
        '/ancient_help': {
            'methods': ['POST'],
            'description': 'Get the paragraph with the highest word occurrences based on a query',
            'example_request': {'query': 'your_query_here'},
            'example_response': {'paragraph': 'paragraph_with_highest_occurrences_here'}
        },
        '/children_stories': {
            'methods': ['POST'],
            'description': 'Get the paragraph with the highest word occurrences based on a query',
            'example_request': {'query': 'your_query_here'},
            'example_response': {'paragraph': 'story_with_highest_occurrences_here'}
        },
    }
    return endpoints_info

@app.route('/', methods=['GET'])
def show_endpoints_info():
    return jsonify(get_endpoints_info())

@app.route('/welcome', methods=['GET'])
def welcome():
    return jsonify({'welcome':"Welcome"})

@app.route('/get_feed', methods=['POST'])
def get_feed():
    data = request.get_json()
    query = data.get('query', '')
    k = data.get('k', 3)
    top_chunks, top_scores = find_k_nearest(query, chunk_embeddings, k)
    feed = ""
    for chunk in top_chunks:
        feed += chunk
    print(feed)
    return jsonify({'feed': feed})

# @app.route('/ancient_help', methods=['POST'])
# def get_highest_occurrences():
#     try:
#         data = request.get_json()
#         query = data.get('query')

#         # You can pass 'paragraphs' in the request data as well if needed
#         max_occurrences_paragraph, _ = find_paragraph_with_highest_occurrences_ancient(remove_stopwords(query), paragraphs_ancient)

#         result = {
#             'paragraph': max_occurrences_paragraph,
#         }

#         return jsonify(result)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/children_stories', methods=['POST'])
# def get_highest_occurrences_children():
#     try:
#         data = request.get_json()
#         print(data)
#         query = data.get('query')

#         # You can pass 'paragraphs' in the request data as well if needed
#         max_occurrences_paragraph, _ = find_paragraph_with_highest_occurrences_children(remove_stopwords(query), paragraphs_children)

#         result = {
#             'paragraph': max_occurrences_paragraph,
#         }

#         return jsonify(result)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Run the app on localhost and your IP address, on port 8080
    app.run(debug=True, host='0.0.0.0', port=8080,use_reloader=False)
