import firebase_admin
from firebase_admin import db
import serial
import re
import json
import time

from genAI import getPromptFromData, getGeminiResponse

cred_obj = firebase_admin.credentials.Certificate('./lifebuoy-8161b-firebase-adminsdk-druf5-47f4d6d797.json')
default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL':"https://lifebuoy-8161b-default-rtdb.firebaseio.com/"
        })
ref = db.reference("/test")


ser = serial.Serial("/dev/ttyUSB0", 9600)
pattern = re.compile(r"MESSAGE(.*?)ENDMESSAGE")

while(1):
    if (ser.in_waiting):
        data = ser.readline().decode('utf-8')
        if "MESSAGE" in data:
            match = pattern.search(data)
            result = match.group(1)
            result = json.loads(result)

            curTime = int(time.time())
            
            print(result)
            prompt = getPromptFromData(result)
            distressMsg = getGeminiResponse(prompt)
            print(distressMsg)
            # result["lat"] = "12.923311"
            # result["lon"] = "77.497898"
            result["distresMessage"] = distressMsg
            childRef = ref.child(str(curTime))
            childRef.set(result)
        # print(data)

    

