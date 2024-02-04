import cv2
import mediapipe as mp
import numpy as np
import math
import time
import requests
import json
import mysql.connector

a=10

text = 0

cart_amount  = 0

def get_data_from_db():
    try:
        conn = mysql.connector.connect(host="localhost", user="aditya", password="Python456@di", database="frame")
        
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM amnt;")
        
        rows = cursor.fetchall()
        
        dat = 100
        
        for row in rows:
            dat = row[0]
        
        cursor.close()
        conn.close()
        
        return dat
    except Exception as e:
        print("Error:", e)


def draw_hand_connections(frame, landmarks, connections):
    global text
    global condition, condition_2
    global str_text
    global cart_amount
    
    for connection in connections:
        start_index, end_index = connection
        start_point = (int(landmarks[start_index].x * frame.shape[1]), int(landmarks[start_index].y * frame.shape[0]))
        end_point = (int(landmarks[end_index].x * frame.shape[1]), int(landmarks[end_index].y * frame.shape[0]))
        cv2.line(frame, start_point, end_point, (0, 0, 0), 2)

    # Additional line between the tip of the index finger (landmark 8) and the thumb (landmark 4)
    index_tip = (int(landmarks[8].x * frame.shape[1]), int(landmarks[8].y * frame.shape[0]))
    middle_tip = (int(landmarks[12].x * frame.shape[1]), int(landmarks[12].y * frame.shape[0]))
    ring_tip = (int(landmarks[16].x * frame.shape[1]), int(landmarks[16].y * frame.shape[0]))
    little_tip = (int(landmarks[20].x * frame.shape[1]), int(landmarks[20].y * frame.shape[0]))
    thumb_tip = (int(landmarks[4].x * frame.shape[1]), int(landmarks[4].y * frame.shape[0]))
    cv2.line(frame, index_tip, thumb_tip, (0, 0, 255), 1)  # Drawing a red line between the index finger and thumb
    cv2.line(frame, middle_tip, thumb_tip, (0, 0, 255), 1)
    cv2.line(frame, ring_tip, thumb_tip, (0, 0, 255), 1)
    cv2.line(frame, little_tip, thumb_tip, (0, 0, 255), 1) 
    
    
    
    small_x = landmarks[20].x * frame.shape[1]
    small_y = landmarks[20].y * frame.shape[0]

    thumb_x = landmarks[4].x * frame.shape[1]
    thumb_y = landmarks[4].y * frame.shape[0]

    small_thumb_distance = math.sqrt((small_x - thumb_x)**2 + (small_y - thumb_y)**2)
    print("Distance of ring and thumb is:", small_thumb_distance)
    
    if(small_thumb_distance < 20.0):
    	condition_2 = True
    else:
    	condition_2 = False
    	
    if condition_2:
    	text = text - 10
    	cart_amount = cart_amount - 10
    
    str_text = str(text)
    
    
    
    
    ring_x = landmarks[16].x * frame.shape[1]
    ring_y = landmarks[16].y * frame.shape[0]

    thumb_x = landmarks[4].x * frame.shape[1]
    thumb_y = landmarks[4].y * frame.shape[0]

    ring_thumb_distance = math.sqrt((ring_x - thumb_x)**2 + (ring_y - thumb_y)**2)
    print("Distance of ring and thumb is:", ring_thumb_distance)
       
    if(ring_thumb_distance < 20.0):
    	condition = True
    else:
    	condition = False
     
    if condition:
    	text = text + 10
    	cart_amount = cart_amount + 10
    
    str_text = str(text)
    
    
    
    org = (50, 50)
    fontface = cv2.FONT_HERSHEY_SIMPLEX
    fontScale = 1
    color = (0, 255, 0)
    thickness = 1
    lineType = cv2.LINE_AA
    bottomleftOrigin = False
    
    cv2.putText(frame, str_text, org, fontface, fontScale, color, thickness, lineType, bottomleftOrigin)
 
    
    
    index_x = landmarks[8].x * frame.shape[1]
    index_y = landmarks[8].y * frame.shape[0]

    thumb_x = landmarks[4].x * frame.shape[1]
    thumb_y = landmarks[4].y * frame.shape[0]

    index_thumb_distance = math.sqrt((index_x - thumb_x)**2 + (index_y - thumb_y)**2)
    print("Distance of index and thumb is:", index_thumb_distance)
    '''if index_thumb_distance < 20.0:
       	t = 3	
        while t == 3:
            print("Enter Choice: 1 Exit\t 2 Buy")
            t = int(input("Enter Your Choice: "))
            if t == 1:
                break
            elif t == 2:
                print("Item Bought, Thank you")
                break'''
     
    if(index_thumb_distance < 20.0):
    	print("Distance is less: ", index_thumb_distance)
    	url = "http://192.168.140.139:6987"
    	headers = {"Content-Type": "application/json"}
    	
    	ded_amnt = get_data_from_db()
    	
    	actual_amnt = ded_amnt - cart_amount
    	
    	data = {"TxnAmount": actual_amnt}
    	json_data = json.dumps(data)
    	
    	response = requests.post(url, data = json_data, headers = headers)

def draw_hand_landmarks(frame, hand_landmarks):
    white_bg = np.ones_like(frame) * 255  # Create a white background image
    
    # Define connections between hand landmarks
    connections = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16], [0, 17], [17, 18], [18, 19], [19, 20]]

    for landmarks in hand_landmarks:
        for landmark in landmarks.landmark:
            x = int(landmark.x * frame.shape[1])
            y = int(landmark.y * frame.shape[0])
            cv2.circle(white_bg, (x, y), 5, (0, 0, 0), -1)  # Draw dots with 0.5 opacity
    
        draw_hand_connections(white_bg, landmarks.landmark, connections)  # Draw connections

    cv2.imshow('Hand Landmarks', white_bg)

stream_url = "http://192.168.140.51:81/stream"

def fetch_stream():
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
    mp_drawing = mp.solutions.drawing_utils
    mp_hands = mp.solutions.hands

    with mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.5) as hands:
        for frame in fetch_stream():
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)
            if results.multi_hand_landmarks:
                draw_hand_landmarks(frame, results.multi_hand_landmarks)
            cv2.imshow('Stream', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()

