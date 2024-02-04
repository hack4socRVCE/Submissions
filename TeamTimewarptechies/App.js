import React from "react";
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import { Home } from "./Home";
import {Aboutus} from "./Aboutus"




function App (){ 
    return(
        <div>
        <BrowserRouter>
        <Routes>
          <Route path='/aboutus' element={<Aboutus />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
        </BrowserRouter>
        </div>
    )
} 
export default App 