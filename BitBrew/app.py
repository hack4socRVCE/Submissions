from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/abc1.html')
def page1():
    return render_template('abc1.html')

@app.route('/abc2.html')
def page2():
    return render_template('abc2.html')

@app.route('/abc3.html')
def page3():
    return render_template('abc3.html')

@app.route('/abc4.html')
def page4():
    return render_template('abc4.html')

@app.route('/abc.html')
def page0():
    return render_template('abc.html')

@app.route('/abc5.html')
def page5():
    return render_template('abc5.html')

@app.route('/abc6.html')
def page6():
    return render_template('abc6.html')

@app.route('/combined_map.html')
def page7():
    return render_template('combined_map.html')



if __name__ == '__main__':
    app.run()
