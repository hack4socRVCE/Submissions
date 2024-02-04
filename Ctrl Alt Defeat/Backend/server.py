from flask import Flask,jsonify,request,send_file
from flask_cors import CORS
from model.model import Model

app = Flask(__name__)

cors = CORS(app)
text=[]

history=[]

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/modelinput',methods=["GET","POST"])
def modelinput():
    if request.method=="GET":
        return text
 
    if request.method=="POST":
        Text=request.json['sometext']
        history.append(Text)
        print(history)
        print(text)

        model = Model(Text)
        model.start()

        return jsonify(Text)

@app.route('/modeltextoutput')
def modeloutput():
    text="A ball and cube in freefall - colliding with each other , the above video demonstrates the collision using manim and LLm model. "
    return jsonify(text)


@app.route('/modelvideoutput')
def modelvideoutput():
    video_file_path = "OUTPUT.mp4"
    return send_file(video_file_path, mimetype='video/mp4')
    
@app.route('/history')
def history1():
    print(history)
    return history
    
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
