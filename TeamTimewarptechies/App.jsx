import { useState, useEffect } from 'react';
import abi from './contractJson/med.json';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('Not connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = '0xEF3c17F7c75D505BE4c52b5fe503770fb9C47193'; // Replace with the Sepolia contract address
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        const account = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setState({ provider, signer, contract });
      } catch (error) {
        console.error('Error connecting to blockchain:', error); // Use console.error for errors
      }
    };
    template();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      // Accessing input values
      const name = document.querySelector('input[name="name"]').value;
      const weight = parseInt(document.querySelector('input[name="weight"]').value);
      const systolicpressure = parseInt(document.querySelector('input[name="systolicpressure"]').value);
      const diastolicpressure = parseInt(document.querySelector('input[name="diastolicpressure"]').value);
      const temp = parseInt(document.querySelector('input[name="temp"]').value);
      const oxygen = parseInt(document.querySelector('input[name="oxygen"]').value);
      const pulserate = parseInt(document.querySelector('input[name="pulserate"]').value);
      const diagnosis = document.querySelector('input[name="diagnosis"]').value; // Assuming diagnosis has separate field
      const symptoms = document.querySelector('input[name="symptoms"]').value;
      const medicine = document.querySelector('input[name="medicine"]').value; // Assuming medicine has separate field
      const remarks = document.querySelector('input[name="remarks"]').value;

      // Call the contract function
      const addRecordTx = await state.contract.addRecord(
        name,
        weight,
        systolicpressure,
        diastolicpressure,
        temp,
        oxygen,
        pulserate,
        diagnosis,
        symptoms,
        medicine,
        remarks
      );

      await addRecordTx.wait(); // Wait for transaction to be mined

      alert('Record added successfully!'); // Use success message only after confirmation
    } catch (error) {
      console.error('Error adding record:', error); // Use console.error for errors
      alert('Error adding record. Please try again.');
    }
  };

  return (
    <>
     <div class="main">
    <h1><b><i>ENTER PATIENT'S RECORD</i></b></h1>
    <p><i>Please fill the following information</i></p> 
    <hr/>
    </div>
    <div class="table">
    <p class="fn"><label>PATIENT'S NAME:</label><br/><input type="text" name="name" required placeholder="Full Name" /></p>
    <p class="an">
      <label>WEIGHT(in kg):</label><br /><input type="number" name="weight" id="phone" required />
    </p>
    <p class="pn">
      <label> TEMPERATURE(°F):</label><br /><input type="number" name="temp" id="phone" required />
    </p>
    <p class="ei"><label>PULSE RATE(bpm):</label><br /><input type="number" name="pulserate" id="phone" required /></p>
    <p class="bp"><label>BLOOD PRESSURE:</label><br />
        <p class="sys"><label>systolicpressure(mmHg) :</label><br /><input type="number" name="systolicpressure" id="phone" required /></p>
        <p class="dia"><label>diastolicpressure(mmHg):</label><br /><input type="number" name="diastolicpressure" id="phone" required /></p>

      </p>
    <p class="age"><label>BLOOD OXYGEN(%):</label><br /><input type="number" name="oxygen" id="phone" required /></p>
    <p class="add"><label>SYMPTOMS:</label><br />
          <input type="text" name="symptoms" id="symptoms" required />
        </p>
        <p class="dis"><label>DISEASE:</label><br />
          <input type="text" name="diagnosis" id="disease" required />
        </p>
        <p class="med"><label>MEDICINES PRESCRIBED:</label><br />
          <input type="text" name="medicine" id="medicine" required />
        </p>
        <p class="rem"><label>REMARKS:</label><br />
          <input type="text" name="remarks" id="remarks" required />
        </p>

      <p class="button_allign">
        <button class="button" onClick={handleSubmit}>SUBMIT</button>
      </p>
      </div>
    </>
  );
}

export default App;