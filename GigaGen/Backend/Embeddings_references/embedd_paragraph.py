
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from transformers import DistilBertModel, DistilBertTokenizer
import torch
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords')
nltk.download('punkt')

model_name = "distilbert-base-uncased"
tokenizer = DistilBertTokenizer.from_pretrained(model_name)
model = DistilBertModel.from_pretrained(model_name)

# Update the list with paths of your text files
file_paths = [
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\leo_tolstoy_char_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\others_chars_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\Ramayana_chars_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\Jataka_tales_11_chars_100.txt",
    r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\panchatantra_top25_char_100.txt",
]

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

# Print the total number of chunks
print(f"Total number of chunks: {len(chunks)}")


# Print the size of each chunk
for i, chunk in enumerate(chunks):
    print(f"Size of Chunk {i + 1}: {len(chunk)} characters")

def get_embeddings(text):
    tokens = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**tokens)
    embeddings = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embeddings

chunk_embeddings = [get_embeddings(chunk) for chunk in chunks]

def find_k_nearest(query, chunk_embeddings, k=1):
    query_embedding = get_embeddings(query)
    similarities = [np.dot(query_embedding, chunk_embedding) / 
                    (np.linalg.norm(query_embedding) * np.linalg.norm(chunk_embedding))
                    for chunk_embedding in chunk_embeddings]
    print("@@@@@@@@top k: ", similarities)
    top_k_indices = np.argsort(similarities)[-k:][::-1]
    top_k_chunks = [chunks[i] for i in top_k_indices]
    top_k_scores = [similarities[i] for i in top_k_indices]
    return top_k_chunks, top_k_scores

def remove_stopwords(text):
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text)
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return ' '.join(filtered_words)

# query = "How to manage stress and anxiety"
query="How to manage stress?"
top_chunks, top_scores = find_k_nearest(remove_stopwords(query), chunk_embeddings)
feed = ""
for chunk in top_chunks:
    feed += chunk
print(feed)
