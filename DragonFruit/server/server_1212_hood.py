from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import requests
from twilio.rest import Client

class adii(BaseHTTPRequestHandler):
	
	def do_OPTIONS(self):
		self.send_response(200)
		self.send_header("Content-Type", "text/plain")
		self.send_header("Access-Control-Allow-Origin", "*")
		self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()
	
	def do_GET(self):
		self.send_response(200)
		self.send_header("Content-Type", "text/plain")
		self.send_header("Access-Control-Allow-Origin", "*")
		self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()
		
		'''content_length = int(self.headers['Content-Length'])
		get_data = self.rfile.read(content_length)
		
		print("Recieved finger print is ", get_data)'''
		
	def do_POST(self):
		self.send_response(200)
		self.send_header("Content-Type", "text/plain")
		self.send_header("Access-Control-Allow-Origin", "*")
		self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()
		
		content_length = int(self.headers['Content-Length'])
		post_data = self.rfile.read(content_length)
		d_post_data = json.loads(post_data.decode('utf-8'))
		print("Recieved finger print is ", d_post_data, "\t\t", type(d_post_data))
		
		account_sid = "ACbd66737f95ddcc9daac58eb0f5e09331"
		auth_token = "3a879e29e71894cf72dad53300b2559b"
		
		client = Client(account_sid, auth_token)
		message = client.messages.create(body = f"Your Transaction of Amount {d_post_data['TxnAmount']} is Sucessfull", from_="+16193780115", to = "+918700857698")
				
		if(d_post_data["FingerPrint"] == 1):
			url = "http://192.168.140.139:9823"
			headers = {'Content-Type': 'application/json'}
			p_d_post_data = json.dumps(d_post_data)
			response = requests.post(url, data = p_d_post_data, headers = headers)
		
		self.wfile.write(bytes("Hello Your payment is done", "utf-8"))

HOST = "192.168.140.139"
PORT = 1212

server = HTTPServer((HOST, PORT), adii)
print("Server Live at: ", HOST , ":" , PORT)
server.serve_forever()
server.server_close()
print("The server is shutted down")
