import React from "react";
import { auth, provider } from "../config/firebase";
import { getAuth, signInWithPopup, updateCurrentUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../config/minimal-theme-switcher.js"
import "../css/loginpage.css"
import "../css/picocss.css"
import { useState } from "react";
import { createUserWithEmailAndPassword, } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { wait } from "@testing-library/user-event/dist/utils";


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

function SignUp() {
  const navigate = useNavigate();
  
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  // Event handlers to update state variables
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if(confPassword == password){
   createUserWithEmailAndPassword(auth, email, password).then((res)=>{
    alert("Sucessfully registered")
    navigate('/username-update', { state: username})

    
    
    
}).catch((err)=>{throw err})
    }
    else{
    alert('Please re-enter your password')
    setPassword('')
    setConfPassword('')
    }  

}



  return (
    <>
      <div className="loginPage">
    
    <main className="container">
      <article className="grid">
        <div>
          <hgroup className="animate-character">
            <h1>Create an Account</h1>
            <h2></h2>

          </hgroup>
          <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        aria-label="Username"
        autoComplete="username"
        required
        value={username}
        onChange={handleUsernameChange}
      />
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
      <input
        type="password"
        name="confpassword"
        placeholder="Confirm Password"
        aria-label="Confirm Password"
        autoComplete="current-password"
        required
        value={confPassword}
        onChange={handleConfPasswordChange}
      />

      <button type="submit" className="contrast">
        Sign Up
      </button>

    </form>

   
          
        </div>

        
      </article>
    </main>

  </div>

    </>
  );
}

export default SignUp;
