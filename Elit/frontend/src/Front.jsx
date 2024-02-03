import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import abi from "./artifacts/contracts/Name.sol/Name.json"

function Home() {
  const [name,setName] = useState('');
  const [state,setState] =  useState({
    address : null,
    provider : null,
    signer : null,
    contract : null
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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

  // console.log(state);
  console.log(name)
  return(
    <>
    <input onChange={e=>setName(e.target.value)}></input>
    <button>Submit</button>
    </>
  )
}

export default Home
