import React from 'react';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import App from './App';
import Profile from './profile';
import Login from './login';
import Signup from './signup';

function Routess() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<App/>} />
				<Route path='/profile' element={<Profile/>} />
				{/* <Route path='/login' element={<Login/>} />
				<Route path='/signup' element={<Signup/>} /> */}
			</Routes>
		</Router>
	);
}

export default Routess;