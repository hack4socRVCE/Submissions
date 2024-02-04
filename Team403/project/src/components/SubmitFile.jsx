import React from "react";
import { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
};

const inputStyle = {
  marginBottom: "10px",
};

const buttonStyle = {
  backgroundColor: "#4285F4",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

function SubmitFile() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload the file first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
        navigate("/submitorder");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <div style={containerStyle}>
      <input type="file" onChange={handleChange} style={inputStyle} />
      <button onClick={handleUpload} style={buttonStyle}>
        Upload to Firebase
      </button>
      <p>{percent}% done</p>
    </div>
  );
}

export default SubmitFile;
