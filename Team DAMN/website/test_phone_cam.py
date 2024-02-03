# import requests
# import cv2
# import numpy as np
# import imutils

# url_for_img = "http://172.17.0.185:8080/shot.jpg"
# url_for_mic = "http://172.17.0.185:8080/"
# img_resp = requests.get(url_for_img)
# img_arr = np.array(bytearray(img_resp.content), dtype=np.uint8)
# img = cv2.imdecode(img_arr, -1)
# img = imutils.resize(img, width=800, height=600)
# # cv2.imshow("Android Cam", img)
# cv2.imwrite("some_img.png", img)


# # Press Esc key to exit
# # if cv2.waitKey(1) == 27:
# #     break

# cv2.destroyAllWindows()

import requests
import pyaudio
import wave
stream_url = "http://172.17.0.185:8080/audio.wav"

chunk = 2048
FORMAT = pyaudio.paInt16
channels = 1
sample_rate = 44100

p = pyaudio.PyAudio()
for i in range(p.get_device_count()):
    if 'CABLE Input' in p.get_device_info_by_index(i)["name"]:
        a = i
        break
print("start")
print(i)
stream = p.open(
    format = FORMAT,
    channels = channels,
    rate = sample_rate,
    input=True,
    output=True,
    frames_per_buffer=chunk,
    output_device_index=a    
)
print("here")
r = requests.get(stream_url, stream=True)

for block in r.iter_content(2048):    
    stream.write(block)






# import pyaudio
# import wave
 
# FORMAT = pyaudio.paInt16
# CHANNELS = 1
# RATE = 44100
# CHUNK = 512
# RECORD_SECONDS = 5
# WAVE_OUTPUT_FILENAME = "recordedFile.wav"
# device_index = 2
# audio = pyaudio.PyAudio()

# print("----------------------record device list---------------------")
# info = audio.get_host_api_info_by_index(0)
# numdevices = info.get('deviceCount')
# for i in range(0, numdevices):
#         if (audio.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels')) > 0:
#             print("Input Device id ", i, " - ", audio.get_device_info_by_host_api_device_index(0, i).get('name'))

# print("-------------------------------------------------------------")

# index = int(input())
# print("recording via index "+str(index))

# stream = audio.open(format=FORMAT, channels=CHANNELS,
#                 rate=RATE, input=True,input_device_index = index,
#                 frames_per_buffer=CHUNK)
# print ("recording started")
# Recordframes = []
 
# for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
#     data = stream.read(CHUNK)
#     Recordframes.append(data)
# print ("recording stopped")
 
# stream.stop_stream()
# stream.close()
# audio.terminate()
 
# waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
# waveFile.setnchannels(CHANNELS)
# waveFile.setsampwidth(audio.get_sample_size(FORMAT))
# waveFile.setframerate(RATE)
# waveFile.writeframes(b''.join(Recordframes))
# waveFile.close()







