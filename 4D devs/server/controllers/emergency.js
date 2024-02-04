require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TwilioNumber = process.env.TWILIO_NUMBER;
const apinumber = process.env.GOOGLE_URL_API;
const client = require('twilio')(accountSid, authToken);


const AlertAgency = async (req, res) => {

    const {username} = req.body;
    

    client.messages
        .create({
            from: `${TwilioNumber}`,
            to: `+91 7975789740`,
            body: `Hello. This is an emergency alert for User . Leave the Place Since it will Crave for the Addiction`
        })
        .then((res) => {
            console.log('Message Sent');
        })
        .catch((err) => { console.log(err); });



    client.calls
        .create({
            twiml: `<Response> <Say language="en-US" voice="Polly.Joanna"> Hello ${username}. This is an emergency alert for User . Leave the Place Since it will Crave for the Addiction  </Say> </Response>`,
            to: `+91 7975789740`,
            from: `${TwilioNumber}`
        })
        .then(call => console.log(call.sid,'Call sent'))
        .catch((err) => { console.log(err); });

}

module.exports = {AlertAgency};