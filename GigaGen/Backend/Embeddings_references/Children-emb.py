
from langchain.text_splitter import RecursiveCharacterTextSplitter
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

# Function to find the paragraph with the highest word occurrences
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
text_file_path_1 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\panchatantra_top25_char_100.txt"
with open(text_file_path_1, 'r', encoding='utf-8') as file:
    paragraphs_1 = file.read().split('\n\n')

# Load the second text file
text_file_path_2 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\Jataka_tales_11_chars_100.txt"
with open(text_file_path_2, 'r', encoding='utf-8') as file:
    paragraphs_2 = file.read().split('\n\n')

# Combine paragraphs from both files
paragraphs = paragraphs_1 + paragraphs_2

# Search a query using the word occurrences
query = "Give me the importance of opportunities in our life."
max_occurrences_paragraph, max_occurrences = find_paragraph_with_highest_occurrences_children(query, paragraphs)

# Print the paragraph with the highest word occurrences
print(f"\nParagraph with the highest word occurrences:")
print(max_occurrences_paragraph)
print(f"Number of occurrences: {max_occurrences}")

