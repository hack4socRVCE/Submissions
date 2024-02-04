// Login.page.js

import React, { useState, useEffect } from 'react';
import './loginpage.css';
import MetaMaskTatumButton from './MetaMaskTatumButton';
import centralogo from "./loginpageAssets/centralogo.jpg";
import { Navigate, Routes, Route } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import { useMetaMaskTatum } from '../hooks/useMetaMaskTatum.tsx';

function Loginpage() {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const { connectMetaMask, account } = useMetaMaskTatum();

  const handleMetaMaskConnect = async () => {
    await connectMetaMask();
    setIsMetaMaskConnected(true);
  };

  useEffect(() => {
    if (account) {
      setIsMetaMaskConnected(true);
    }
  }, [account]);

  return (
    
 <>{isMetaMaskConnected?
  null
 :

     <MetaMaskTatumButton onConnect={handleMetaMaskConnect} />


 }
</>
    
  );
}

export default Loginpage;
