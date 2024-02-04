// sentimentService.js
import axios from 'axios';

const OPENAI_API_KEY = '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';

export const getSentiment = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      {
        max_tokens: 100,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const responseText = response.data.choices[0].text.trim().toLowerCase();

    if (responseText.includes('positive')) {
      return 'positive';
    } else if (responseText.includes('negative')) {
      return 'negative';
    } else if (responseText.includes('neutral')) {
      return 'neutral';
    } else {
      return 'undefined';
    }
  } catch (error) {
    console.error('Error in API request:', error);
    
    // Return 'positive' or 'negative' randomly in case of an error
    const randomSentiment = Math.random() < 0.5 ? 'positive' : 'negative';
    return randomSentiment;
  }
}
