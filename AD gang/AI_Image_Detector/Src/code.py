import os
import requests
import openai
import pandas as pd

openai.api_key = os.getenv('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')

def updated_generate_image(input_image_path, image_name):

    image_content = None
    with open(input_image_path, "rb") as f:
        image_content = f.read()

    response = openai.Image.create_variation(
        image=image_content,
        n=1,
        size="1024x1024"
    )

    image_url = [data['url'] for data in response['data']][0]
    print(f"Image URL: {image_url}")

    image_data = requests.get(image_url).content
    with open(f"fake_{input_image_path}", "wb") as f:
        f.write(image_data)

    s3.upload_file(f"fake_{input_image_path}",
                   "dalle2images", f"fake/{image_name}")

def updated_main():

    images_df = pd.read_csv('df_final.csv')
    image_names = list(images_df["Name"])

    for image_name in image_names:
        s3.download_file('dalle2images', f'real/{image_name}', image_name)
        updated_generate_image(image_name, image_name)
        if (os.path.exists(image_name)):
            os.remove(image_name)
        if (os.path.exists(f"fake_{image_name}")):
            os.remove(f"fake_{image_name}")
        images_df = images_df.loc[images_df["Name"] != image_name]
        images_df.to_csv("df_final.csv")

if __name__ == "__main__":
    updated_main()
