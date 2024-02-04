import cv2
def take_pic():
    cam=cv2.VideoCapture(0)

    ret,frame=cam.read()
    if not ret:
        print("Error Capture!!")

    img_count=1
    img_name=f"opencv_frame_{img_count}.png"
    img_count+=1

    cv2.imwrite(img_name,frame)
    print("ScreenShot taken")

    cam.release()
    cv2.destroyAllWindows()