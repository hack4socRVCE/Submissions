#import ultralytics and cv2 for live and real time detection

import cv2
from ultralytics import YOLO
import requests
import numpy as np

model_path = "/home/aditya/Desktop/rv_hack/data/runs/detect/train/weights/last.pt"

model = YOLO(model_path)

threshold = 0.5

def fetch_stream(stream_url):
    response = requests.get(stream_url, stream=True)
    if response.status_code == 200:
        bytes_stream = bytes()
        for chunk in response.iter_content(chunk_size=1024):
            bytes_stream += chunk
            a = bytes_stream.find(b'\xff\xd8')
            b = bytes_stream.find(b'\xff\xd9')
            if a != -1 and b != -1:
                jpg = bytes_stream[a:b+2]
                bytes_stream = bytes_stream[b+2:]
                try:
                    frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_COLOR)
                    yield frame
                except Exception as e:
                    print("Error decoding frame:", e)



def main():
	'''#Open the webcam
	cap = cv2.VideoCapture(0)
	
	#check if webcam is opened succesfully
	
	if not cap.isOpened():
		print("Error in Opening webcam")
		return'''
	
	stream_url = "http://192.168.140.51:81/stream"
	
	while True:
		#Capture the Frame-by-Frame
		for frame in fetch_stream(stream_url):
			
		
			results = model(frame)
		
			for result in results:
				#Acess the boxes attributs of each  item
				boxes = result.boxes
			
				#Convert the boxese into a list
				boxes_list = boxes.data.tolist()
				#print(boxes_list, '\n\n')
			
			for o in boxes_list:
				x1, y1, x2, y2, score, class_id = o
				frame = cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
		
			#Check if the Frame is valid
			'''if not ret:
				print("Error: in loading Frame")
				break'''
			
			#Display the Frame
			cv2.imshow("Webcam", frame)
		
			if cv2.waitKey(1) & 0xFF == ord('q'):
				break
	
	#Release the webcam and close all OpenCV windows
	
	cv2.release()
	cv2.destroyAllWindows()

if __name__ == "__main__":
	main() 
