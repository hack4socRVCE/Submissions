from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import requests
import mysql.connector

HOST = "192.168.140.139"
PORT = 9823

class adii(BaseHTTPRequestHandler):
	

	def get_data_from_db(self):
		try:
			conn = mysql.connector.connect(host="localhost", user="aditya", password="Python456@di", database="frame")
			
			cursor = conn.cursor()
			
			cursor.execute("Select * from amnt;")
			
			rows = cursor.fetchall()
			
			dat = 100
			
			for row in rows:
				dat = row[0]
			
			cursor.close()
			conn.close()
			
			return dat
		except Exception as e:
			print("Error fetching the data from the database: ", e)
			return None

	
	def insert_data(self, amount):
		try:
			conn = mysql.connector.connect(host="localhost", user="aditya", password="Python456@di", database="frame")
			
			cursor = conn.cursor()
			
			cursor.execute("Update amnt set Amount=(%s)", (amount,))
			conn.commit()
			
			cursor.close()
			conn.close()
			print("Data Inserted Successfully.")
		except Exception as e:
			print("Error: ", e)
	
	
	
	def send_data_from_db(self):
		try:
			conn = mysql.connector.connect(host="localhost", user="aditya", password="Python456@di", database="frame")
			
			cursor = conn.cursor()
			
			cursor.execute("Select * from amnt;")
			
			rows = cursor.fetchall()
			
			dat = 100
			
			for row in rows:
				dat = row[0]
			
			cursor.close()
			conn.close()
			
			
			#self.send_response(200)
			#self.send_header("Content-Type", "text/plain")
			#self.end_headers()
			
			self.wfile.write(bytes(f"{dat}", "utf-8"))		
					
			#print("Data Recieved Successfully.")
		except Exception as e:
			print("Error: ", e)
		
	
	
	
	
	def do_GET(self):
	
		if(self.path == "/1212_hood_payment"):
			self.send_response(200)
			self.send_header("Content-Type", "text/plain")
			self.end_headers()
			
			self.send_data_from_db()
			
			#self.wfile.write(bytes(f"{self.amnt}", "utf-8"))
		
		else:
			
			self.send_response(200)
			self.send_header("Cotent-Type", "text/html")
			self.send_header("Access-Control-Allow-Origin", "*")
			self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			self.send_header("Access-Control-Allow-Headers", "Content-Type")
			self.end_headers()
			#self.end_headers()
		
			with open("/home/aditya/Desktop/rv_hack/server/dashboard.html", "rb") as f:
				self.wfile.write(f.read())
		
	
	def do_POST(self):
		self.send_response(200)
		self.send_header("Cotent-Type", "text/plain")
		self.send_header("Access-Control-Allow-Origin", "*")
		self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()
		
		
		content_length = int(self.headers["Content-Length"])
		post_data = self.rfile.read(content_length)
		d_post_data = json.loads(post_data.decode('utf-8'))
		
		ded_amnt = self.get_data_from_db()
		print("Amount in bank is: ", ded_amnt, "\t", type(ded_amnt))
		
		actual_amnt = int(ded_amnt) - int(d_post_data["TxnAmount"])
		
		if(d_post_data["FingerPrint"] == 1):
			print("Now We have to update amound in the dashboard" ,d_post_data,"\t\t", type(d_post_data))
			print("Updating Amount to the TXNAMOUNT: ", d_post_data["TxnAmount"])
			self.insert_data(actual_amnt)
			#self.send_data_from_db()
		

server = HTTPServer((HOST, PORT), adii)

print(f"The server is running on ({HOST})")

server.serve_forever()
server.server_close()

print("Server is closed")
