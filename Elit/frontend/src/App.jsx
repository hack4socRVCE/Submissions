import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { lazy,Suspense } from 'react';
import Loader from './components/Loading/Loader';
import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./artifacts/contracts/Complain.sol/Complain.json"

const Login = lazy(()=>import('./Login'));
const Home = lazy(()=>import('./components/Home'))
const Front = lazy(()=>import('./Front'));
const Bot = lazy(()=>import('./components/Bot'))
const Missing = lazy(()=>import('./components/Missing'))
const FileComplain = lazy(()=>import('./components/FileComplain'))
const SeeComplain = lazy(()=>import('./components/SeeComplain'))

function App(){

  const [state,setState] =  useState({
    address : null,
    provider : null,
    signer : null,
    contract : null
  });
  
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
      const contractabi = abi.abi;
      try {
        const { ethereum } = window;
    
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts" });
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractabi, signer);
        setState({ address, provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  
  }, []);

  return(
    <Suspense fallback={<Loader/>}>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/front' element={<Front/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Bot' element={<Bot/>}/>
            <Route path='/Missing' element={<Missing/>}/>
            <Route path='/FileComplain' element={<FileComplain state = {state}/>}/>
            <Route path='/SeeComplain' element={<SeeComplain state={state}/>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </Suspense>
  )
}

export default App;