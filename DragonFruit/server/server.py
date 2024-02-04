'''from http.server import HTTPServer, BaseHTTPRequestHandler


HOST = "192.168.20.139"
PORT = 4565

class adii(BaseHTTPRequestHandler):
	
	def do_GET(self):
		self.send_response(200)
		self.send_header("Content-type", "text/html")
		self.end_headers()
		
		self.wfile.write(bytes("<html><body><h1>Aditya SAroja</h1></body></html>", "utf-"))
	def do_POST(self):
		self.send_response(200)
		self.send_header("Content-type", "text/html")
		self.end_headers()
		
		self.wfile.write(bytes("<html><body><h3>GET REQUEST</h3></body></html>", "utf-8"))
		
server = HTTPServer((HOST, PORT), adii)
print("Srever Is Running Now")
server.serve_forever()
server.server_close()
print("Server Stopped")'''

from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json

HOST = "192.168.13.139"
PORT = 4565

class adii(BaseHTTPRequestHandler):
	
	def do_OPTIONS(self):
		self.send_response(200)
		self.send_header('Content-Type', 'text/plain')
		self.send_header("Access-Control-Allow-Origin", "*")
		self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()
		
	def do_POST(self):
		self.send_response(200)
		self.send_header("Content-Type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*")
		self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()
		
		#Recieve Data
		content_length = int(self.headers['Content-Length'])
		post_data = self.rfile.read(content_length)
		decoded_data = json.loads(post_data.decode('utf-8'))
		print(type(decoded_data), "\t", decoded_data, "\n\n")
		keys = list(decoded_data.keys())
		values = list(decoded_data.values())
		print("Keys", keys, "\n")
		print("Values", values, "\n")
		
		if(values[0] == "adityasaroha456@gmail.com" and values[1] == "Python456@di"):
			'''with open("test.html", "rb") as f:
				self.wfile.write(f.read())'''
			self.wfile.write(bytes("192.168.13.139:9823", "utf-8"))
		else:
			self.wfile.write(bytes("Invalid User", "utf-8"))

server = HTTPServer((HOST, PORT), adii)
print("Server is now running\n\n")
server.serve_forever()
server.server_close()
print("Server is closed")

'''from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json

class MyHTTPRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type='text/plain', headers=None):
        self.send_response(status)
        self.send_header('Content-type', content_type)
        if headers:
            for header, value in headers.items():
                self.send_header(header, value)
        self.end_headers()

    def do_OPTIONS(self):
        # Set CORS headers for preflight requests
        self._set_headers(headers={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        })

    def do_POST(self):
        # Set CORS headers
        self._set_headers(headers={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        })

        # Parse request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Process data
        print("Received data:", data)

        # Send response
        self._set_headers(content_type='application/json')
        response_data = json.dumps({"message": "Data received successfully"})
        self.wfile.write(response_data.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=MyHTTPRequestHandler, port=4565):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
'''
