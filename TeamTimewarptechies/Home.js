import React from 'react'
import { Link } from "react-router-dom"; 
import { Aboutus } from './Aboutus';
import { useState } from 'react';
import './Home.css'

export const Home = () => {

 return (
    
    <div >
      <button className="btn" onClick={()=> window.location.href='/frontend/smartcontract/client/src/App.jsx'}>Add Record</button>
      <button className="btn">View Record</button>
      <Link to={'/aboutus'}><button className="btn">About Us</button></Link>

      <div><Link to={'/'}><button className='logout'>Logout</button></Link></div>
    </div>
 )
}
