import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from './imageHelper';

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyAZd7u_oOGUApMoylIsBERj1TiD6P9ptXc');

    const [image, setImage] = useState('');
    const [imageInineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "fetch all the information you can get from the above FIR(first investigation report) and make a summary of the case and give suitable sections and acts suitable for the case in 500 words give each heading and sub heading in seperate lines leave 2 lines between every paragraph   ", imageInineData
        ]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick = () => {
        aiImageRun();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))

        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
      <div style={{
        maxWidth: '90%',
        margin: 'auto',
        marginTop: '20px',
        padding: '20px',
        marginBottom: '20rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backdropFilter: 'blur(20px)', // Adjust the blur amount as needed
        backgroundColor: 'rgba(0,0,0, 0.3)', // Adjust the alpha (transparency) as needed
      }}>
        <div>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <input type='file' onChange={(e) => handleImageChange(e)} style={{ marginRight: '10px' }} />
            <button style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }} onClick={() => handleClick()}>Search</button>
          </div>
          <img src={image} alt="Preview" style={{ width: '30%', marginTop: '20px', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }} />
        </div>
  
        {loading && aiResponse === '' ? (
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#007BFF' }}>Loading ...</p>
        ) : (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            {aiResponse.split('** **').map((line, index) => (
              <p key={index} style={{ color: 'white', fontSize: '1.5rem', margin: '0' }}>{line}</p>
            ))}
          </div>
        )}
      </div>
    );
};

export default AiwithImage;
