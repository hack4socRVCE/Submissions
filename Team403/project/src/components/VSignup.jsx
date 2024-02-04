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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../config/firebase";
import {  db } from "../config/firebase";


const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};
const inputStyle = {
    width: "100%",
    padding: "10px",
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

function VSignUp() {
  const navigate = useNavigate();
  
  

  const [user] = useAuthState(auth);
  const [storename, setStorename] = useState('');
  const [address, setaddress] = useState('');
  const [ph_no, setph_no] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  // Event handlers to update state variables
  const handleUsernameChange = (e) => {
    setStorename(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlephnoChange = (e) => {
    setph_no(e.target.value);
  };

  const handleaddressChange = (e) => {
    setaddress(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };

  const postsRef = collection(db, "vendors");
  const schema = yup.object().shape({
      ph_no: yup.number(),
      email: yup.string(),
      store_name: yup.string(),
      address: yup.string()
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log('addDoc')
      await addDoc(postsRef, {
         ...data
        // size: fileUpload.size,
        // filepath: fileLink,
        // user: user?.displayName,
        // userid: user?.uid,
        // completeStatus: false,
        // store_name: storename,
        // email: email,
        // ph_no: ph_no,
        // address: address
      });


    //   if(confPassword == password){

        
    //     createUserWithEmailAndPassword(auth, email, password).then((res)=>{
     
         
     
    //      alert("Sucessfully registered")
    //      navigate('/username-update', { state: storename})
     
         
         
         
    //  }).catch((err)=>{throw err})
    //      }
    //      else{
    //      alert('Please re-enter your password')
    //      setPassword('')
    //      setConfPassword('')
    //      }  
  
    alert("Submitted successfully");
      navigate("/");
    };

  // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
    

// }



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
          <form onSubmit={handleSubmit(onSubmit)}>
          <input
          style={inputStyle}
          placeholder="Store name"
          {...register("store_name")}
        />
      
      {errors.store_name?.message}
     
      <input
          style={inputStyle}
          placeholder="Email"
          {...register("email")}
        />
      {errors.email?.message}
      
      <input
          style={inputStyle}
          placeholder="Contact number"
          {...register("ph_no")}
        />
      {errors.ph_no?.message}
      <input
          style={inputStyle}
          placeholder="Store address"
          {...register("address")}
        />
      {errors.address?.message}
      {/* <input
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
      /> */}

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

export default VSignUp;
