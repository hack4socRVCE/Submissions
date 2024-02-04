import { redirect } from "react-router-dom";
import "./css/login.css"
import React, { useEffect, useState } from "react";
import  { Redirect } from 'react-router-dom';

function Login() {
 
   const [Email,setEmail]=useState('')
   const [Password,setPassword]=useState('')
   const [error, setError] = useState('');
   

   const handleLogin = async (e) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Email, Password }),
      });

      
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        // Redirect to dashboard or home page
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in');
    }
  };

	return (
        <div >
         <h1 class="title" style={{color:"black"}}>CTRL-ALT-DEFEAT</h1>
    <div class="container1">
        
        <form class="signup-form" onSubmit={handleLogin}>
            <h2>LOGIN</h2>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" value={Email} className="input" name="email" onChange={event => {
            setEmail(event.target.value)
          }
        }required/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" className="input" value={Password} name="password" onChange={event => {
            setPassword(event.target.value)
          }
          
        } required/>
            </div>
            
            <div class="form-group">
                <button  className="Button"  type="submit">LOGIN</button>
            </div>
        </form>
        <p>Dont have an account Login</p>
    </div>
     
        </div>
	);
}

export default Login;