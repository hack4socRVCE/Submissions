import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation'
import "./Signup.css"
import axios from 'axios';



const Signup = () => {
   const initialValues = {
 fname: "",
 lname: "",
 email: "",
 dob: "",
 phoneno: "",
 password: "",
 aadhar: "",
 sex: "",
 address: "",
 password: "",
};

    

      const [formValues, setformValues]=useState(initialValues);
    
      const [errors, setErrors] = useState({});
      const [isSubmit, setisSubmit] = useState(false);
      const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

      const handleChange=(event)=>{
        console.log(event.target);
        const {name,value}=event.target;
        setformValues((prev) => ({
          ...prev,
          [name]: value,
        }));
       // console.log(${name}: ${value});
      }
    
      // const handleInput = (event) => {
      // };

      // useEffect=()=>{
      //   if(Object.keys(errors)=== 0 && isSubmit){
      //     console.log(formValues);
      //   }
      // },[errors];

      const handleSubmit = async(event) => {
        event.preventDefault();
        setErrors(validation(formValues));
        setisSubmit(true);
        if (formValues.password !== formValues.confirmPassword) {
          setErrors({ confirmPassword: "Passwords do not match" });
      } else {
        try {
          // Make an HTTP POST request to your Express API
          console.log('Form Values:', formValues);
          const response = await axios.post('http://localhost:8081/signup', formValues);
    
          // Handle the response, e.g., show a success message
          console.log('Server Response:', response.data);
          navigate('/');
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error('Error during signup:', error);
        }
      }
  
      setisSubmit(true);
      };   
  return (
<div>
            <div class="wrapper">
                <h2 id="login">Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                <div class="label">
                <label htmlFor="fname">First Name</label>
                <input type="text" placeholder="Enter First name" name='fname' value={formValues.fname} onChange={handleChange}/>
                <label htmlFor="lname">Last Name</label>
                <input type="text" placeholder="Enter Last name" name='lname' value={formValues.lname} onChange={handleChange}/>
                <div id="error">{errors.name && <span>{errors.name}</span>}</div>
                <p class="an">
        Adhaar Number: <input type="text" name="Adhaar" id="phone" required />
          </p>
          <div>
                      <label htmlFor='dob'>Date of Birth</label>
                      <input type='date' name='dob' value={formValues.dob} onChange={handleChange} />
                    </div>
                  </div>
                    <div class="label">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email" name='email' value={formValues.email} onChange={handleChange}/>
                    <div id="error">{errors.email && <span>{errors.email}</span>}</div>
                    </div>
                    
                    <div class="label">
                      <label htmlFor='phoneno'>Phone Number</label>
                      <input type='tel' name='phoneno' value={formValues.phoneno} onChange={handleChange} />
                    </div>
                    <div class="label">
                      <label htmlFor='age'>
        Age: <input type="number" name="age" id="phone" required /></label>
        </div>
    <p>Sex:

            <fieldset >
            <div class="allign">  
                <input type="radio" name="gender" id="male" required /><label>Male</label></div>
                <div class="allign">
                <input type="radio" name="gender" id="female" required /><label>Female</label></div>
                <div class="allign">
                <input type="radio" name="gender" id="others" required /><label>Others</label></div>
            </fieldset>
    </p>
    <p class="add"> <label>Address: </label><br /><textarea name="address" id="address" cols="20" rows="10" required placeholder="Home Address"></textarea></p>
                    <div class="label">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" value={formValues.password} onChange={handleChange}/>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange}/>
                    <div id="error">{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</div>
                    </div>
                    <div><label>Are you a doctor?</label>
                    <fieldset>
            <div class="allign">
            <input type="radio" name="Is_Doctor" value="Yes" required /><label>Yes</label></div>
            <div class="allign">
            <input type="radio" name="Is_Doctor" value="No" required /><label>No</label></div> 
            </fieldset>
    </div>
    <br />
    <div class="label">License key:<input type="text" name="License_Key" /></div>
                    <button type='submit' className="button">Sign Up</button>
                    <Link to="/"><button type='submit' class="button" onClick={()=> ('/')}>Login</button></Link>

                </form>
            </div>
        </div>
  )
}

export default Signup