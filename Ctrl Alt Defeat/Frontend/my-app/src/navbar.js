import  "./css/navbar.css"
import {  Link } from "react-router-dom";

function Routerz() {

    const myStyle = {
        color: 'rgb(255, 44, 44)',
      };

    return (
      <div className="App">
       
    <header>
        <div class="container">
            <h1 className="ctrl" > CTRL-ALT-<span style={myStyle}>DEFEAT</span></h1>
            <nav>
                <ul>
                    <Link to='/'>
                    <li><a href="#">Home</a></li>
                    </Link>
                    <Link to='/profile'>
                    <li><a href="#">Profile</a></li>
                    </Link>
                    
                </ul>
            </nav>
        </div>
    </header>
   </div> 
    );
  }
  
  export default Routerz;