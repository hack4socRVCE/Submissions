#imports
from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import json
import pandas as pd

app = Flask(__name__)
#create chatbot
client = OpenAI(
  api_key="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",
) 

startup_desc = ""

#define app routes
@app.route("/")
def index():
    return render_template("start.html")

@app.route("/pitch")
def pitch():
    return render_template("pitch.html")

@app.route("/startup")
def startup():
    return render_template("startup.html")

@app.route("/investor")
def investor():
    return render_template("investor.html")

@app.route("/investor_info", methods=['GET', 'POST'])
def investor_info():
    if request.method == 'POST':
        sector = request.form.get('preferences')
        amount = int(request.form.get('investmentAmount'))
    with open("static/combined.json") as json_file:
        data = json.load(json_file)
    print(data)
    new_json = "["
    for each in data.keys():
        if sector.lower() in data[each]['Sector'].lower():
            if amount > int(data[each]["Funding"]):
                new_json += str(data[each]) 
                new_json += ","
    new_json = new_json[:-2]
    new_json = new_json.replace("'", "\"")
    print(new_json)
    with open("static/current.txt", 'w') as file:
        file.write(new_json)
    return ('', 204)
@app.route("/get")
#function for the bot response
def get_bot_response():
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": f"You are a chatbot of a startup which which links startups and investors. Answer the queries of the investor. Always be shorter than 30 words but incase of a detailed question, give a longer response. Here's what your startup is about. {startup_desc}"},
        {"role": "user", "content": str(request.args.get('msg'))}
    ]
    )
    print(request.args.get('msg'))
    return str(completion.choices[0].message.content)

@app.route('/get_video_source/<video_name>')
def get_video_source(video_name):
    # Replace this with your logic to dynamically get the video source based on video_name
    video_source = f"/static/videos/{video_name}"
    return jsonify({"video_source": video_source})

@app.route('/video/<video_name>')
def current_video(video_name):
    global startup_desc

    with open("static/current.txt") as txt_file:
        data = str(txt_file.read())
    data += "}]"
    json_data = json.loads(data)
    startup_desc=json_data[int(video_name) + 1]["Pitch"]
    return f"{video_name}"

if __name__ == "__main__":
    app.run(debug=True)