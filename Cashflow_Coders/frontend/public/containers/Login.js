import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/login_background.jpg'; // Import your image

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    // Dummy login logic (replace with actual login logic)
    console.log("Logged in with email:", email, "and password:", password);

    // Redirect to dashboard page
    window.location.href = '/dashboard';
  };

  return (
    <div className='container-fluid p-0' style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col-md-6">
        <div className="text-center">
          <h1 className="text-white">Sign In</h1>
          <p className="text-white">Sign into your Account</p>
          <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
                required
              />
            </div>
            {/* Button type changed to submit */}
            <button className='btn btn-primary' type='submit'>Login</button>
          </form>

          <p className='mt-3'>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </p>
          <p className='mt-3'>
            Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
