import "./css/signup.css"
import React, { useEffect, useState } from "react";

function Signup() {
 
   const [Email,setEmail]=useState('')
   const [Password,setPassword]=useState('')
   const [username,setUsername]=useState('')
   const [Cpassword,setCpassword]=useState('')

   function handleSubmit(){
    insertArticle()
    setEmail('')
    setPassword('')
    setUsername('')
    setCpassword('')
}
   
// data insertion

function InsertArticle(body){
    return fetch(`http://127.0.0.1:5000/signup`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  .then(response => response.json())
  .then(jsonData => {
    console.log(jsonData);
    })
  .catch(error => console.log(error))
  }

  const insertArticle = () =>{
        InsertArticle({Email,username,Password,Cpassword})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }


	return (
        <div >
         <h1 class="title" style={{color:"black"}}>CTRL-ALT-DEFEAT</h1>
    <div class="container1">
        
        <form class="signup-form" onSubmit={handleSubmit}>
            <h2>SIGN-UP</h2>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" value={Email} className="input" name="email" onChange={event => {
            setEmail(event.target.value)
          }
        }required/>
            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text"  name="username" value={username} className="input" onChange={event => {
            setUsername(event.target.value)
          }
        } required/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" className="input" value={Password} name="password" onChange={event => {
            setPassword(event.target.value)
          }
        } required/>
            </div>
           
            <div class="form-group">
                <label for="username">Confirm password</label>
                <input type="text"  name="username" value={Cpassword} className="input" onChange={event => {
            setCpassword(event.target.value)
          }
        } required/>
            </div>
            <div class="form-group">
                <button  className="Button"  type="submit">Signup</button>
            </div>
        </form>
        <p>Dont have an account Login</p>
    </div>
        </div>
	);
}

export default Signup;