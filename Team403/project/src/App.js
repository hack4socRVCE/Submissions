
import './App.css';
import Navbar from "./components/Navbar"
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login';
import SubmitOrder from './components/SubmitOrder';
import SubmitFile from './components/SubmitFile';
import SignUp from './components/SignUp';
import UsernameUpdate from './components/usernameUpdate';
import PendingOrders from './components/PendingOrders';
import ViewOrders from './components/ViewOrders';
import ReviewOrders from './components/Review';
import VSignUp from './components/VSignup';
import VLogin from './components/VLogin';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vlogin" element={<VLogin />} />
          <Route path="/submitorder" element={<SubmitOrder />} />
          <Route path="/submitfile" element={<SubmitFile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username-update" element={<UsernameUpdate />} />
          <Route path="/view-all-orders" element={<PendingOrders />} />
          <Route path="/submissions" element={<ViewOrders />}/>
          <Route path="/review-applications" element={<ReviewOrders/>} />
          <Route path="/vendor_signup" element={<VSignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
