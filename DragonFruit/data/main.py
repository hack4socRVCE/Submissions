#From ultralytics import YOLO V8 model

from ultralytics import YOLO

#Load the YOLO Model.
model = YOLO("yolov8n.yaml")

#Train the model.
model.train(data = "config.yaml", epochs = 100)
