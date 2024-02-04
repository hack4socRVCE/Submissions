from PIL import ImageChops, Image
import matplotlib.pyplot as plt 
import numpy as np
import cv2
from skimage.metrics import structural_similarity as ssim

def main(imageA_path,imageB_path):
    imageA = cv2.imread(imageA_path)
    imageB = cv2.imread(imageB_path)
    imageB = cv2.resize(imageB, (imageA.shape[1], imageA.shape[0]))

    # Convert the images to grayscale
    imageA_gray = cv2.cvtColor(imageA, cv2.COLOR_BGR2GRAY)
    imageB_gray = cv2.cvtColor(imageB, cv2.COLOR_BGR2GRAY)

    # Calculate the Structural Similarity Index (SSI) between the two images
    score, _ = ssim(imageA_gray, imageB_gray, full=True)
    return score*100
    # actual_error = 0
    # im1 = Image.open(img1)
    # x = np.array(im1.histogram())

    # im2 = Image.open(img2)
    # y = np.array(im2.histogram())

    # try:
    #     if len(x) == len(y):
    #         error = np.sqrt(((x - y) ** 2).mean())
    #         error = str(error)[:2]
    #         actual_error = float(100) - float(error)
    #     # diff = ImageChops.difference(im1, im2).getbbox()
    #     return actual_error
    #     #     print("Not Duplicate Image")
    #     #     print('Matching Images In percentage: ', actual_error,'\t%' )
    #     #     # f = plt.figure()
    #     #     # text_lable = str("Matching Images Percentage" + str(actual_error)+"%")
    #     #     # plt.suptitle(text_lable)
    #     #     # f.add_subplot(1,2, 1)
    #     #     # plt.imshow(im1)
    #     #     # f.add_subplot(1,2, 2)
    #     #     # plt.imshow(im2)
    #     #     # plt.show(block=True)
    #     # else:
    #     #     print("Duplicate Image")
    #     #     print('Matching Images In percentage: ', actual_error,'%' )
    #     #     # f = plt.figure()
    #     #     # text_lable = str("Matching Images Percentage" + str(actual_error)+"%")
    #     #     # plt.suptitle(text_lable)
    #     #     # f.add_subplot(1,2, 1)
    #     #     # plt.imshow(im1)
    #     #     # f.add_subplot(1,2, 2)
    #     #     # plt.imshow(im2)
    #     #     # plt.show(block=True)

        
    # except ValueError as identifier:
    #     # f = plt.figure()
    #     # text_lable = str("Matching Images Percentage " + str(actual_error)+"%")
    #     # plt.suptitle(text_lable)
    #     # f.add_subplot(1,2, 1)
    #     # plt.imshow(im1)
    #     # f.add_subplot(1,2, 2)
    #     # plt.imshow(im2)
    #     # plt.show(block=True)
    #     print('identifier: ', identifier)
    #     return actual_error

if __name__=="__main__":
    print(main(r"C:\Users\Karan\Desktop\ChainForge\ChainForge\static\profile_pics\4cf1a975051e4247.jpg",r"C:\Users\Karan\Desktop\ChainForge\ChainForge\static\profile_pics\987b7142268acf70.jpg"))