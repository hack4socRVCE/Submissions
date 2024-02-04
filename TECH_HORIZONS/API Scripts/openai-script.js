const axios = require('axios');
const fs = require('fs');
const Papa = require('papaparse');

const apiKey = "open-ai key";

function findSentiment(text) {
    const pattern = /\b(positive|negative|neutral)\b/i;
    const match = text.match(pattern);
    return match ? match[0].toLowerCase() : "undefined";
}

async function getSentiment(text) {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
            prompt: `Sentiment analysis of the following text: ${text}`,
            max_tokens: 100,
            temperature: 0
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const responseText = response.data.choices[0].text.trim().toLowerCase();

        if (responseText.includes("positive")) {
            return "positive";
        } else if (responseText.includes("negative")) {
            return "negative";
        } else if (responseText.includes("neutral")) {
            return "neutral";
        } else {
            return "undefined";
        }
    } catch (error) {
        console.error(`Error in API request: ${error}`);
        return "undefined";
    }
}

const filePath = "C:\\Users\\alish\\Downloads\\corrected_train_tweets.csv"; // Update with your file path

// Read CSV file using papaparse
const csvData = fs.readFileSync(filePath, 'utf8');
const parsedData = Papa.parse(csvData, { header: true });

// Arrays to store true and predicted sentiments
const trueRes = [];
const predicted = [];

// Mapping for sentiment labels
const labelMapping = { '0': 0, '1': 1, 'neutral': 2, 'positive': 3, 'negative': 4, 'undefined': 5 };

// Loop through the parsed data
parsedData.data.forEach(row => {
    const text = row['tweet'];
    const trueSentiment = String(row['label']).trim();

    console.log(`Processing Text: ${text}`);

    const predictedSentiment = getSentiment(text);

    console.log(`True Sentiment: ${trueSentiment}`);
    console.log(`Predicted Sentiment: ${predictedSentiment}\n`);

    trueRes.push(trueSentiment);
    predicted.push(predictedSentiment);
});

// Map sentiment labels to numeric values
const trueResNumeric = trueRes.map(label => labelMapping[label]);
const predictedNumeric = predicted.map(label => labelMapping[label]);

// Calculate metrics
const accuracy = trueResNumeric.length > 0 ? calculateAccuracy(trueResNumeric, predictedNumeric) : 0;
const precision = trueResNumeric.length > 0 ? calculatePrecision(trueResNumeric, predictedNumeric) : 0;
const recall = trueResNumeric.length > 0 ? calculateRecall(trueResNumeric, predictedNumeric) : 0;
const f1 = trueResNumeric.length > 0 ? calculateF1Score(trueResNumeric, predictedNumeric) : 0;

// Print or use the calculated metrics as needed
console.log("Accuracy:", accuracy);
console.log("Precision:", precision);
console.log("Recall:", recall);
console.log("F1-Score:", f1);

// Helper functions for metric calculations
function calculateAccuracy(trueValues, predictedValues) {
    return trueValues.reduce((acc, value, index) => (value === predictedValues[index] ? acc + 1 : acc), 0) / trueValues.length;
}

function calculatePrecision(trueValues, predictedValues) {
    const truePositives = trueValues.reduce((acc, value, index) => (value === predictedValues[index] ? acc + 1 : acc), 0);
    const allPredictedPositives = predictedValues.filter(value => value === 1).length;
    return truePositives / allPredictedPositives;
}

function calculateRecall(trueValues, predictedValues) {
    const truePositives = trueValues.reduce((acc, value, index) => (value === predictedValues[index] ? acc + 1 : acc), 0);
    const allTruePositives = trueValues.filter(value => value === 1).length;
    return truePositives / allTruePositives;
}

function calculateF1Score(trueValues, predictedValues) {
    const precision = calculatePrecision(trueValues, predictedValues);
    const recall = calculateRecall(trueValues, predictedValues);
    return 2 * (precision * recall) / (precision + recall);
}
