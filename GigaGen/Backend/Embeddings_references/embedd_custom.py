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


text_file_path = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\BhagavadGita_chars_100.txt"

model_name = "distilbert-base-uncased"
tokenizer = DistilBertTokenizer.from_pretrained(model_name)
model = DistilBertModel.from_pretrained(model_name)


rect_text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=0,
    length_function=len,
)

with open(text_file_path, 'r', encoding='utf-8') as file:
    text = file.read()

chunks = rect_text_splitter.split_text(text)

def get_embeddings(text):
    tokens = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**tokens)
    embeddings = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embeddings

chunk_embeddings = [get_embeddings(chunk) for chunk in chunks]

def find_k_nearest(query, chunk_embeddings, k=5):
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
query="Tips for maintaining a healthy work-life balance?"
top_chunks, top_scores = find_k_nearest(remove_stopwords(query), chunk_embeddings)
feed = ""
for chunk in top_chunks:
    feed += chunk
print(feed)

