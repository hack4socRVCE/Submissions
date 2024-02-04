
import React from 'react';
import { useMetaMaskTatum } from '../hooks/useMetaMaskTatum.tsx';
import Metamasklogo from './loginpageAssets/MetaMask_Fox.svg.png' 
import AdminLayout from "layouts/Admin.js";
import { Navigate, Routes, Route } from "react-router-dom";
import centralogo from "./loginpageAssets/centralogo.jpg";

function MetaMaskTatumButton() {
const { connectMetaMask, account } = useMetaMaskTatum();

// console.log(account)
return (
<div>
{account ? (
  <> <Routes>
          <Route path="/admin/*" element={<AdminLayout accid={account} />} />
           <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes> </>)  : (<>  <div className="loginpageComp">
        <div className="LoginpageApp">
        <div className="App-header">
<div id="description">
<img id="centralogo" src={centralogo} alt="" />
<h1>Empower Your Enterprise:</h1>
<h2>Blockchain ERP, Unleashing Efficiency</h2>
<h2>Security and Unrivaled Transparency</h2> 
<button id="mmbtn" onClick={connectMetaMask}> <img id="mmlogo" src={Metamasklogo} alt="" /> Connect MetaMask</button>
</div></div></div>
</div>
</>
)}
</div>
);
}


export default MetaMaskTatumButton;
