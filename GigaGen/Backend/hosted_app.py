from flask import Flask, request, jsonify, send_file
from openai import OpenAI
from flask_cors import CORS  # Import the CORS class
# import time
app = Flask(__name__)
CORS(app)

# speech_file_path = "/home/gigagen/speech.mp3"
speech_file_path = "speech.mp3"

client = OpenAI(
    api_key="api-key",
)

# Newely added@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
webpage_context = """ 
Welcome to Website!

Developed by Tejas, Sri Ram, and Karthik Avinash, students of Indian Institute of Information Technology Dharwad, as a part of 'Hack 4 Soc' hackathon in the 'Generative AI' theme.

Scope and Purpose:
Our website is more than just a platform for story generation; it is a groundbreaking solution that goes beyond conventional storytelling. With the tagline "It is not just story generation, it is bridging generation," our project focuses on addressing a crucial societal need by bridging cultural narratives through the integration of modern technology and ancient wisdom.

Problem Statement and Addressed Issues:
At its core, our project is a response to the need for preserving cultural heritage, promoting education, fostering inclusivity, and recognizing the enduring relevance of ancient wisdom in navigating contemporary challenges. The values of the website revolve around cultural preservation, education, inclusivity, and the belief in the enduring relevance of ancient wisdom in navigating modern challenges.

Humanitarian Focus:
Our project is developed with a humanitarian purpose, aiming to create a positive impact on society. By combining modern storytelling techniques with ancient wisdom, our website provides a holistic and enriching experience for users interested in cultural exploration, literary appreciation, and personal development.

Key Features:

Cultural Preservation: We focus on modernizing old literary works to make them accessible to a contemporary audience.
Story Specialization for Kids: Our platform specializes in creating stories for kids, incorporating moral values to promote positive growth.
Self-Help Guidance: Offering self-help guidance based on ancient scripts and holy scriptures to assist users in their personal development.
Innovation and Routes:

TaleCraft Route: This route generates new stories from moral values, ensuring a fresh and engaging narrative.
StorySynthesis Route: Provides a new story by synthesizing existing stories, adding a unique touch to the storytelling experience.
Hack4Soc 2.0 - Generative AI 4 Soc:
Our participation in 'Hack 4 Soc' 2.0, organized by IEEE RVCE Computer Society, has given us the opportunity to contribute to positive change with AI. Empowering positive change is the core focus of the hackathon, from personalized healthcare to inclusive education. In the 'Generative AI' theme, we have endeavored to transform society for the better by developing a project that aligns with the values of cultural preservation, education, inclusivity, and empowerment.

Conclusion:
In conclusion, our website stands as a testament to innovation, cultural appreciation, and societal impact. By leveraging generative AI, we are not just creating stories; we are bridging generations, preserving ancient wisdom, and contributing to positive change in society.
"""

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
# text_file_path_1 = r"/home/gigagen/mysite/Dataset/BhagavadGita_chars_100.txt"
text_file_path_1 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\BhagavadGita_chars_100.txt"
with open(text_file_path_1, 'r', encoding='utf-8') as file:
    paragraphs_1 = file.read().split('\n\n')
    # print(paragraphs_1)

# Load the second text file
# text_file_path_2 = r"/home/gigagen/mysite/Dataset/leo_tolstoy_char_100.txt"
text_file_path_2 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\leo_tolstoy_char_100.txt"
with open(text_file_path_2, 'r', encoding='utf-8') as file:
    paragraphs_2 = file.read().split('\n\n')

# Load the first text file
# text_file_path_3 = r"/home/gigagen/mysite/Dataset/Mahabaratha_char_100.txt"
text_file_path_3 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\Mahabaratha_char_100.txt"
with open(text_file_path_3, 'r', encoding='utf-8') as file:
    paragraphs_3 = file.read().split('\n\n')

# Load the second text file
# text_file_path_4 = r"/home/gigagen/mysite/Dataset/others_chars_100.txt"
text_file_path_4 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\others_chars_100.txt"
with open(text_file_path_4, 'r', encoding='utf-8') as file:
    paragraphs_4 = file.read().split('\n\n')

# Load the first text file
# text_file_path_5 = r"/home/gigagen/mysite/Dataset/Ramayana_chars_100.txt"
text_file_path_5 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Ancient\Ramayana_chars_100.txt"
with open(text_file_path_5, 'r', encoding='utf-8') as file:
    paragraphs_5 = file.read().split('\n\n')


# Combine paragraphs from both files
paragraphs_ancient = paragraphs_1 + paragraphs_2 + paragraphs_3 + paragraphs_4 + paragraphs_5


# Load the first text file
# text_file_path_1 = r"/home/gigagen/mysite/Dataset/child/panchatantra_top25_char_100.txt"
text_file_path_1 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\panchatantra_top25_char_100.txt"
with open(text_file_path_1, 'r', encoding='utf-8') as file:
    paragraphs_1_child = file.read().split('\n\n')

# Load the second text file
# text_file_path_2 = r"/home/gigagen/mysite/Dataset/child/Jataka_tales_11_chars_100.txt"
text_file_path_2 = r"C:\Users\Karthik Avinash\OneDrive\Desktop\Hack4Soc\Dataset\Children\Jataka_tales_11_chars_100.txt"
with open(text_file_path_2, 'r', encoding='utf-8') as file:
    paragraphs_2_child = file.read().split('\n\n')

# Combine paragraphs from both files
paragraphs_children = paragraphs_1_child + paragraphs_2_child

#__________________________________NEWELY ADDED ENDS_______________________

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
        '/ancient_help': {
            'methods': ['POST'],
            'description': 'Get the paragraph with the highest word occurrences based on a query',
            'example_request': {'query': 'query_here'},
            'example_response': {'paragraph': 'you_will_get_most_relevant_ancient_texts_or_paragraphs_here'}
        },
        '/children_stories': {
            'methods': ['POST'],
            'description': 'Get the paragraph with the highest word occurrences based on a query',
            'example_request': {'query': 'query_here'},
            'example_response': {'paragraph': 'you_will_get_story_with_highest_occurrences_here'}
        },
        '/story_to_moral': {
            'methods': ['POST'],
            'description': 'Convert a story to moral values',
            'example_request': {'story': 'story_here'},
            'example_response': {'moral_values': 'you_will_get_extracted_moral_values_here'}
        },
        '/moral_to_modern_story': {
            'methods': ['POST'],
            'description': 'Generate a modern story from moral values',
            'example_request': {'moral_values': 'moral_values_here'},
            'example_response': {'modern_story': 'you_will_get_generated_modern_story_here'}
        },
        '/generate_image': {
            'methods': ['POST'],
            'description': 'Generate an image based on a prompt',
            'example_request': {'prompt': 'prompt_here'},
            'example_response': {'image_url': 'you_will_get_generated_image_url_here'}
        },
        '/generate_k_image': {
            'methods': ['POST'],
            'description': 'Generate an image based on a prompt',
            'example_request': {'prompt': 'prompt_here','k': 'enter_number_of_images_to_generate.'},
            'example_response': {'image_urls': 'you_will_get_k_generated_image_urls_here_in_form_of_list'}
        },
        '/text_to_speech': {
            'methods': ['POST'],
            'description': 'Convert text to speech',
            'example_request': {'story': 'speech_here'},
            'example_response': 'Audio file'
        },
        '/story_title_generation':{
            'methods': ['POST'],
            'description': 'Generate a title based on a story',
            'example_request': {'story': 'give_story_here'},
            'example_response': {'title': 'you_will_get_title_here'}
        },
        '/website_chatbot':{
            'methods': ['POST'],
            'description': 'Generate a title based on a story',
            'example_request': {'query': 'give_your query_here'},
            'example_response': {'reply': 'you_will_get_answer_here'}
        },
    }
    return endpoints_info

@app.route('/', methods=['GET'])
def show_endpoints_info():
    return jsonify(get_endpoints_info())

@app.route('/welcome', methods=['GET'])
def welcome():
    return jsonify({'welcome':"Welcome"})

@app.route('/website_chatbot', methods=['POST'])
def website_chatbot():
    try:
        data = request.get_json()
        query = data.get('query')

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
              {"role": "system", "content": webpage_context},
              {"role": "user", "content": "Based on our website information, answer the query which a user has: ["+query+"]"}
            ]
        )

        mod_sol = completion.choices[0].message.content
        result = {
            'reply': mod_sol,
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ancient_help', methods=['POST'])
def get_highest_occurrences():
    try:
        data = request.get_json()
        query = data.get('query')

        # You can pass 'paragraphs' in the request data as well if needed
        max_occurrences_paragraph, _ = find_paragraph_with_highest_occurrences_ancient(remove_stopwords(query), paragraphs_ancient)

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
              {"role": "system", "content": max_occurrences_paragraph},
              {"role": "user", "content": "Based on the paragraph taken from ancient texts, give a solution to the query: ["+query+"]"}
            ]
        )
        mod_sol = completion.choices[0].message.content
        result = {
            'problem_solution': mod_sol,
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/children_stories', methods=['POST'])
def get_highest_occurrences_children():
    try:
        data = request.get_json()
        print(data)
        query = data.get('query')
        if not query:
            result = {
                    'children_story': "Please enter a valid query/ moral",
                }
            return jsonify({'error': str(e)}), 500

        max_occurrences_paragraph, _ = find_paragraph_with_highest_occurrences_children(remove_stopwords(query), paragraphs_children)

        result = {
            'paragraph': max_occurrences_paragraph,
        }

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
              {"role": "system", "content": max_occurrences_paragraph},
              {"role": "user", "content": "Based on the paragraph taken from various story books, give a new story for children that aligns with: ["+query+"], Make it a good content for kids/children, so that they enjoy reading it!"}
            ]
        )
        mod_sol = completion.choices[0].message.content
        result = {
            'children_story': mod_sol,
        }
        print(mod_sol)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/story_to_moral', methods = ['POST'])
def story_to_moral():
    data = request.get_json()
    feed = data.get('story','')
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "Provide moral of this story in less than 15 words: "+feed},
        {"role": "user", "content": "Moral values found in the story"}
      ]
    )
    print(completion.choices[0].message)
    moral_values = completion.choices[0].message.content
    print(moral_values)
    return jsonify({'moral_values': moral_values})

@app.route('/moral_to_modern_story', methods = ['POST'])
def moral_values_to_story():
    data = request.get_json()
    moral_values = data.get('moral_values','')
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
          {"role": "system", "content": moral_values},
          {"role": "user", "content": "Generate a short story set in  India like an expert without using the words in the prompt, encapsulating the above moral. The story is for kids. Please keep the story under 200 words. Dont use the same adjectives when generated every time.You can use fantasy but not everytime. Avoid the words bustling and vibrant."}
        ]
    )
    modern_story = completion.choices[0].message.content
    print(modern_story)
    return jsonify({'modern_story': modern_story})

@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt', '')
    size = data.get('size', '1024x1024')
    quality = data.get('quality', 'standard')
    n = data.get('n', 1)

    response = client.images.generate(
        model="dall-e-2",
        prompt=prompt,
        size=size,
        quality=quality,
        n=n,
    )

    if response:
        image_url = response.data[0].url
        return jsonify({'image_url':image_url})
    else:
        return jsonify({'error': 'Failed to generate image'}), 500

@app.route('/generate_k_image', methods=['POST'])
def generate_k_image():
    data = request.get_json()
    prompt = data.get('prompt')
    size = data.get('size', '1024x1024')
    quality = data.get('quality', 'standard')
    n = data.get('n', 1)
    num_images = data.get('k', 1)
    image_urls = []
    for i in range(num_images):
        # if i!=0:
        #     time.sleep(20)
        response = client.images.generate(
            model="dall-e-2",
            prompt=prompt,
            size=size,
            quality=quality,
            n=n,
        )
        if response:
            image_urls.append(response.data[0].url)
        else:
            return jsonify({'error': 'Failed to generate one of the image'}), 500

    if image_urls:
        return jsonify({'image_urls':image_urls})
    else:
        return jsonify({'error': 'Failed to generate all images'}), 500

@app.route('/text_to_speech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    story = data.get('story', '')
    response = client.audio.speech.create(
        model="tts-1",
        voice="alloy",
        input=story
    )
    response.stream_to_file(speech_file_path)
    return send_file(speech_file_path, as_attachment=True)

@app.route('/story_title_generation',methods=['POST'])
def generate_story_title():
    data = request.get_json()
    story = data.get('story','')
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "system", "content": story},
                    {"role": "user", "content": "Give a suitable title for the story. It must be poetic and also have the moral values associated with it. Dont use colon"}
        ]
        )
    title = completion.choices[0].message.content
    return jsonify({'title':title})

if __name__ == '__main__':
    # Run the app on localhost and your IP address, on port 8080
    app.run(debug=True, host='0.0.0.0', port=8080,use_reloader=False)
