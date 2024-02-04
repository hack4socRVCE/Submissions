const axios = require('axios');
const UserModel = require('../../models/UserModel');
require("dotenv").config();

const API_KEY = process.env.ChatGPT_KEY;
const API_INSTRUCTION = "You are a helpful assistant.";

// Initialize an array to store conversation messages
const messages = [{ "role": "system", "content": API_INSTRUCTION }];

const GPTNextDay = async (req,res) => {
    
    console.log(("Hiiiiiiiiiiii"));
    const {email,tasks,addictType,PerDay, years, triedToGiveUp, reason} = req.body;

    console.log(email,tasks);

    // Function to interact with the ChatGPT model
    async function chatGPT(message, history) {
        // Append the user's message to the list of messages
        messages.push({ "role": "user", "content": message });

        try {
            // Call OpenAI's chat completion API to generate a response
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo-1106",
                messages: messages
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            });

            // Get the response from the API and append it to the list of messages
            const responseData = response.data;
            if (responseData.choices && responseData.choices.length > 0) {
                const assistantResponse = responseData.choices[0].message.content;
                messages.push({ "role": "assistant", "content": assistantResponse });

                // Parse the assistant response as JSON
                return assistantResponse;

            } else {
                return "No response";
            }
        } catch (error) {
            // Handle errors, e.g., rate limit errors
            if (error.response && error.response.status === 429) {
                return "API rate limit exceeded, try again after 20 seconds.";
            } else {
                return ("An error occurred", error);
            }
        }
    }

    // Log the response given by GPT-3.5 Turbo
    //PerDay,years,triedToGiveUp,reason,addictType
    let command = "";
    if (addictType == 'Cigarettes') {
        command = `title: 
        type: String
        ,
        description:
        type: String
        ....
        i want you to design 5 task following the title,description schema given to you if i consume ${PerDay} cigarattes per day and i have been using the cigarattes from ${years} and i have tried ${triedToGiveUp} to quit and reson for this is ${reason} i want today task to design in such a way based on the info given and dont repeat is the tasks previoulsy given ${tasks} .. just the response only in json object only if u give other words or explaination i cannot filter the respinse as i am using chatgpt APi`;
    }
    else if (addictType == 'Alcohol') {
        command = `title: 
        type: String
        ,
        description:
        type: String
        ....
        i want you to design 5 task following the title,description schema given to you if i consume ${PerDay} units of alcohol per day and i have been using alcohol from ${years} and i have tried ${triedToGiveUp} to quit and reson for this is ${reason} i want today task to design in such a way based on the info given and dont repeat is the tasks previoulsy given ${tasks} .. just the response only in json object only if u give other words or explaination i cannot filter the respinse as i am using chatgpt APi`;
    }
    else if (addictType == 'Mobile'){
        command = `title: 
      type: String
    ,
    description:
      type: String
      ....
        i want you to design 5 task following the title,description schema given to you if i use my mobile phone for ${PerDay} hours per day and i have been using the phone from ${years} and i have tried ${triedToGiveUp} to reduce usage and the reason for this is ${reason} i want today's task to be designed in such a way based on the info given and dont repeat is the tasks previoulsy given ${tasks} .. just the response only in json object only if u give other words or explaination i cannot filter the respinse as i am using chatgpt APi`;
    }
    

    chatGPT(command, messages)
        .then(async (response) => {
            if (typeof response === 'object' && response.tasks) {
                // If response is already an object with 'tasks' property, return it
            } else if (typeof response === 'string') {
                // Parse the assistant response as JSON
                const obj = JSON.parse(response);

                // Check if the parsed object has tasks property
                if (obj && obj.tasks) {
                    const addictTasks = await UserModel.findOneAndUpdate(
                        { email: email },
                        { $set: { DailyTasks: { tasks: obj.tasks } } },
                        { new: true, upsert: true }
                    );
                    const user = addictTasks;
                    console.log("Tasked Got from AI");
                    return res.status(200).json({ message: 'Tasks updated successfully', user });
                } else {
                    console.error("Parsed response does not have 'tasks' property:", obj);
                    throw new Error("Invalid response format");
                }
            } else {
                console.error("Unexpected response format:", response);
                throw new Error("Invalid response format");
            }
        })
        .catch(error => console.error(error));
}

module.exports = GPTNextDay;


