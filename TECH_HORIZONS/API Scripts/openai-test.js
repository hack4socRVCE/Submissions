const axios = require('axios');

const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key

async function createEmbeddings(inputText) {
    try {
        const response = await axios.post('https://api.openai.com/v1/embeddings', {
            model: "text-embedding-ada-002",
            input: inputText
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error(`Error in API request: ${error}`);
    }
}

const inputText = "The food was delicious and the waiter...";

createEmbeddings(inputText);
