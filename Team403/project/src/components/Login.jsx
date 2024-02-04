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

function Login() {
  const navigate = useNavigate();
  const gUrl = "../img/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png";
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
     if(result.user.email === "printoproject123@gmail.com"){navigate("/submissions")}
    navigate("/")
  };

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
    signInWithEmailAndPassword(auth, email, password).then((res)=>{console.log(res); alert("Login successful"); navigate("/")}).catch((err)=>{console.log(err); alert('Wrong credentials'); navigate("/login")})
  
console.log(getAuth)  }

  return (
    <>
      <div className="loginPage">
    
    <main className="container">
      <article className="grid">
        <div>
          <hgroup className="animate-character">
            <h1>Sign in</h1>
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
            <fieldset>
              <label for="remember">
                <input type="checkbox" role="switch" id="remember" name="remember" />
                Remember me
              </label>
            </fieldset>

            <button type="submit" className="contrast" onclick="event.preventDefault()" >Login</button>

          </form>
          <hgroup className="animate-character">
            <h1>Or</h1>
            <h2></h2>
            <button className="contrast" style={{marginTop: "10px"}} onClick={signInWithGoogle}>
              <img src={require("../img/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png")} 
              alt="logo" width="25"
              height="25"
               />
               <div style={{margin: "15px", padding: "0px"}}> Sign in with Google</div>
       
      </button>
          </hgroup>
          <button className="contrast" style={{marginTop: "10px"}}  onClick={(e)=>{e.preventDefault(); navigate('/signup') }}>New user? Create an Account</button>
        </div>

        
      </article>
    </main>

  </div>

    </>
  );
}

export default Login;
