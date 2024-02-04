import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backgroundStyle = {
  backgroundColor:'rgba(255, 255, 255, 0.55)',
  // backgroundSize: "cover",
  backgroundPosition: "center",
  justifyContent: 'center',
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color:'black', 
  padding:'20px'
};

function Prediction(e) {

    const [prediction, setPrediction] = useState(null);

    const [state, setState] = useState('');
    const [crop, setCrop] = useState('');
    const [season, setSeason] = useState('');
    const [area, setArea] = useState('');
    const [production, setProduction] = useState('');
    const [annualRainfall, setAnnualRainfall] = useState('');
    const [fertilizer, setFertilizer] = useState('');
    const [pesticide, setPesticide] = useState('');
    const makePrediction = () => {
    setPrediction(randomPrediction.toFixed(2));
    };


  return (
    <div style={backgroundStyle}>

         <form onSubmit={makePrediction} action="/predict" method="POST" >
         <label htmlFor="State">State:</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" /><br></br><br></br>

        <label htmlFor="crop">Crop:</label>
        <input type="text"  value={crop} onChange={e => setCrop(e.target.value)} placeholder="Crop" /><br></br><br></br>

        <label htmlFor="season">Season:</label>
        <select id="season" name="season" value={season} onChange={e => setSeason(e.target.value)}>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Autumn">Autumn</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="WholeYear">Whole Year</option>
        </select><br></br><br></br>

        <label htmlFor="area">Area:</label>
        <input type="range" id="area" name="area" min="1" max="34421" onChange={e => setArea(e.target.value)} placeholder="Area"/>
        <span id="areaValue"></span><br></br><br></br>

        <label htmlFor="production">Production:</label>
        <input type="range" id="production" name="production" min="0" max="77520" onChange={e=> setProduction(e.target.value)}/>
        <span id="productionValue"></span><br></br><br></br>

        <label htmlFor="rainfall">Annual Rainfall:</label>
        <input type="number" id="rainfall" name="rainfall" onChange={e=>setAnnualRainfall(e.target.value)}/><br></br><br></br>

        <label htmlFor="fertilizer">Fertilizer:</label>
        <input type="number" id="fertilizer" name="fertilizer" onChange={e => setFertilizer(e.target.value)}/><br></br><br></br>

        <label htmlFor="pesticide">Pesticide:</label>
        <input type="number" id="pesticide" name="pesticide" onChange={e => setPesticide(e.target.value)}/><br></br><br></br>

        {/* <button type="submit">Submit</button>
        <button type="reset">Reset</button> */}
    </form>
    <div>
      <button onClick={makePrediction}>Make Prediction</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
    </div>
  );
}

export default Prediction;


