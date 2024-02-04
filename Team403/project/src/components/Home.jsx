// import React from "react";
// import ViewOrders from "./ViewOrders";
// import { useNavigate } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";
// const containerStyle = {
//   maxWidth: '800px',
//   margin: '0 auto',
//   padding: '20px',
//   textAlign: 'start',
// };

// const titleStyle = {
//   color: '#fff',
// };

// const textStyle = {
//   color: '#fff',
// };

// const btnStyle = {
//   display: 'inline-block',
//   padding: '10px 20px',
//   backgroundColor: '#007BFF',
//   color: '#fff',
//   textDecoration: 'none',
//   borderRadius: '5px',
//   margin: '20px',
// };
// const linkStyles = {
//   textDecoration: "none",
//   color: "#fff",
//   margin: "0 10px",
// };
// function Home() {
//   const navigate = useNavigate();
//   return (
//     <>
      
//       <div style={containerStyle}>
//       <h1 style={titleStyle}>Welcome, Your Document Printing Solution!</h1>
//       <p style={textStyle}>Are you in need of hassle-free document printing? Look no further!</p>
//       <p style={textStyle}><strong>Upload Your Documents:</strong> Our user-friendly platform allows you to easily upload your documents in various formats - PDFs, Word documents, PowerPoint presentations, and more.</p>
//       <p style={textStyle}><strong>Convenient Payment Options:</strong> Pay securely online with just a few clicks or choose our offline payment option for your convenience.</p>
//       <p style={textStyle}><strong>Alert Your Local Printing Shop:</strong> Once your order is confirmed and paid for, we'll notify your nearest printing shop to start processing your documents. No more waiting in long queues or worrying about when your documents will be ready!</p>
//       <p style={textStyle}><strong>Fast and Reliable Service:</strong> We prioritize your time. Expect your professionally printed documents to be ready when you need them.</p>
//       <p style={textStyle}><strong>Why Choose Us:</strong></p>
  
//       <p style={textStyle}><strong>Join Our Community:</strong> Join the growing community of users who rely on us for their document printing needs. Experience the convenience of modern technology combined with local printing expertise.</p>
//       <p style={textStyle}><strong>Customer Support:</strong> Have questions or need assistance? Our dedicated customer support team is here to help you every step of the way.</p>
//       {/* <a onClick={(e)=>{e.preventDefault(); navigate("/login")}} style={btnStyle}>Sign In</a> */}
//       {/* <Link to="/submitorder" style={linkStyles}>
//           New Order
//         </Link> */}
//          <p style={textStyle}>Print it your way, the easy way</p>
//         <a onClick={(e)=>{e.preventDefault(); navigate("/signup")}} style={btnStyle}>New user? Sign up</a>
//         <a onClick={(e)=>{e.preventDefault(); navigate("/vlogin")}} style={btnStyle}>Sign in as printer vendor</a>

        

      

//     </div>
//     </>
//   );
// }

// export default Home;

import React from "react";
import ViewOrders from "./ViewOrders";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import "../css/home.css"; // Create a separate CSS file for styling

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to Printin! Your Document Printing Solution!</h1>
        
        <p className="text">
          <strong>Upload Your Documents:</strong> Our user-friendly platform
          allows you to easily upload your documents in various formats - PDFs,
          Word documents, PowerPoint presentations, and more.
        </p>
       
        
        <p className="text">
          <strong>Alert Your Local Printing Shop:</strong> Once your order is
          confirmed and paid for, we'll notify your nearest printing shop to
          start processing your documents. No more waiting in long queues or
          worrying about when your documents will be ready!
        </p>
        <p className="text">
          <strong>Fast and Reliable Service:</strong> We prioritize your time.
          Expect your professionally printed documents to be ready when you need
          them.
        </p>
        
        <p className="text">Print it your way, the easy way</p>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
          className="btn primary-btn"
        >
          New user? Sign up
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate("/vlogin");
          }}
          className="btn secondary-btn"
        >
          Sign in as printer vendor
        </a>
      </div>
    </>
  );
}

export default Home;

