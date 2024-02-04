import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import {auth} from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import "../config/minimal-theme-switcher.js"
import "../css/picocss.css"
import { signOut } from "firebase/auth";

function UsernameUpdate  () {
   
    const stateVar = useLocation();
    var username = stateVar.state;
    const navigate = useNavigate();
    const signUserOut = async () => {
        await signOut(auth);
        
      };
    useEffect(()=>{
        
        console.log(stateVar)
    
        updateProfile(auth.currentUser, {displayName: username, photoURL: "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png" }).then((res)=>{
            console.log(true)
            console.log(auth.currentUser)
            signUserOut();
            navigate('/login')
        }).catch((err)=>{console.log(false); console.log(err)})
      
      }, [auth])

      return(
        <div>Loading....</div>
      )

}

export default UsernameUpdate;