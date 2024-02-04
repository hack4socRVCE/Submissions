# import all the libraries
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

def add_watermark(image_path):
    # image opening
    image = Image.open(image_path)

    # text Watermark
    watermark_image = image.copy()

    draw = ImageDraw.Draw(watermark_image)
    # ("font type",font size)
    w, h = image.size
    x, y = int(w / 2), int(h / 2)
    if x > y:
        font_size = y
    elif y > x:
        font_size = x
    else:
        font_size = x

    font = ImageFont.truetype("arial.ttf", int(font_size/3))

    # add Watermark
    draw.text((x, y), "Art for sale", fill=(255, 255, 255), font=font, anchor='mm')

    # Save the image with watermark
    watermark_image.save(image_path.split(".")[0]+"_watermarked."+image_path.split(".")[1])  # Save as PNG to support transparency
    