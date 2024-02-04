import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/img/stock_log.webp'; // Import the background image file

const Home = () => (
  <div className='container' style={{ 
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    minHeight: '100vh',
    display: 'flex',              // Use flexbox
    justifyContent: 'center',     // Center content horizontally
    alignItems: 'center'          // Center content vertically
  }}>

    <div style={styles.jumbotron} className='jumbotron'>
      <h1 style={styles.title} className='display-4'>Welcome!</h1>
      <p style={styles.subtitle} className='lead'></p>
      <hr className='my-4' />
      <p style={styles.description}>Cashflow Coders</p>
      <Link style={styles.button} className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
    </div>
  </div>
);

const styles = {
  jumbotron: {
    backgroundColor: 'rgba(52, 152, 219, 0.5)', // Semi-transparent background color
    color: '#ffffff', 
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px', 
    padding: '20px', 
  },
  title: {
    fontSize: '2.5em', 
    fontWeight: 'bold', 
  },
  subtitle: {
    fontSize: '1.2em', 
  },
  description: {
    fontSize: '1.1em', 
  },
  button: {
    fontSize: '1.2em', 
  },
};

export default Home;
