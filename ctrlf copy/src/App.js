import React from "react";
import Home from './components/pages/Home'
import Prediction from './components/pages/prediction'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';



function App() {
  return (
    <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/prediction" element={<Prediction/>} />
        </Routes>
    </Router>
  );
}

export default App;