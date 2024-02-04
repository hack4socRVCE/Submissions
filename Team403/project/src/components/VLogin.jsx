import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../config/minimal-theme-switcher.js"
import "../css/loginpage.css"
import "../css/picocss.css"
import { useState } from "react";


const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

const buttonStyle = {
  backgroundColor: "#4285F4",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

function VLogin() {
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((res)=>{console.log(res); alert("Login successful"); navigate(`/submissions`)}).catch((err)=>{console.log(err); alert('Wrong credentials'); navigate("/vlogin")})
  
console.log(getAuth)  }

  return (
    <>
      <div className="loginPage">
    
    <main className="container">
      <article className="grid">
        <div>
          <hgroup className="animate-character">
            <h1>Sign in as printing vendor</h1>
            <h2></h2>

          </hgroup>
          <form onSubmit={handleSubmit}>
          <input
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        autoComplete="email"
        required
        value={email}
        onChange={handleEmailChange}
      />
            <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password"
        autoComplete="current-password"
        required
        value={password}
        onChange={handlePasswordChange}
      />
          

            <button type="submit" className="contrast" onclick="event.preventDefault()" >Login</button>

          </form>
         
        </div>

        
      </article>
    </main>

  </div>

    </>
  );
}

export default VLogin;
