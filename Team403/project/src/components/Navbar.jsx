import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {  db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
const navbarStyles = {
  backgroundColor: "#333",
  color: '#fff',
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyles = {
  textDecoration: "none",
  color: "#fff",
  margin: "0 10px",
};

const userStyles = {
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  verticalAlign: "center",
  width: "auto",
};
const buttonStyle = {
  backgroundColor: "#4285F4",
  color: "#fff",
  padding: "5px 5px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

function Navbar() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [name, setname] = useState(auth.currentUser?.displayName);
  const [logo, setlogo] = useState(auth.currentUser?.photoURL);
  const [navoptions, setnavoptions] = useState(false);
  useEffect(() => {

    // const postsRef = collection(db, "vendors");
    // const data = await getDocs(postsRef);
    // console.log(data.docs[0].data())
    // let i=0;
    // for ( i = 0; i < data.docs.length; i++) {
    //     if(data.docs[i].data().email == auth.currentUser?.email){
    //         setnavoptions(true);
    //         i=data.docs.length+1;
           
    //     }
    
    console.log(auth.currentUser);
    if (auth.currentUser == null) {
      navigate("/");
    }
    //if(user?.email === "printoproject123@gmail.com"){navigate("/submissions")}
    setname(auth.currentUser?.displayName);
    setlogo(auth.currentUser?.photoURL);
    console.log(auth);
    console.log(auth.currentUser);


    
  }, [auth.currentUser, user]);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div style={navbarStyles}>
      { (user?.email !== "printoproject123@gmail.com") && <>
      <Link to="/" style={linkStyles}>
        Home
      </Link>
      
      {!user ? (
        <>
        
        <Link to="/login" style={linkStyles}>
          Login
        </Link>

       
        </>
      ) : (<>
        <Link to={`/review-applications?user=${auth.currentUser?.uid}`}  style={linkStyles}>
        Your Pending Orders
      </Link>
        <Link to="/submitorder" style={linkStyles}>
          Submit File
        </Link>
        <Link to="/vendor_signup" style={linkStyles}>
          Become a printing service provider
        </Link>
        </>
      )}</>
}
 {/* {(user?.email === "printoproject123@gmail.com") && <Link to="/submissions" style={linkStyles}>
        SUBMISSIONS
      </Link>} */}

      {user && (
        <div style={userStyles}>
          {/* <div>Username: </div> */}
          <img
            src={logo}
            width="30"
            height="30"
            alt="navimage"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          <div style={{ marginRight: "10px" }}>{name}</div>

          <button onClick={signUserOut} style={buttonStyle}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
