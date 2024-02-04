function validation(formValues){
    let error ={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(a-zA-Z0-9){5,}$/

    if(formValues.fname===""){
        error.fname="First Name should not be empty"
    }
    else{
        error.fname=""
    }
    if(formValues.lname===""){
        error.lname="Last Name should not be empty"
    }
    else{
        error.lname=""
    }

    if(formValues.email===""){
        error.email="Email should not be empty"
    }
    else if(!email_pattern.test(formValues.email)){
        error.email="Email Didn't Match"
    }
    else{
        error.email=""
    }
    if(formValues.password===""){
        error.password="Password should not be empty"
    }
    // else if(!password_pattern.test(formValues.password)){
    //     error.password="Password didn't match"
    // }
    else if(formValues.password.length <5){
        error.password="Password Must be more than 5 characters"
    }
    else{
        error.password=""
    }
    if(formValues.phoneno===""){
        error.phoneno="Enter Phone Number"
    }
    else{
        error.phoneno=""
    }
    if(formValues.cpassword===""){
        error.cpassword="Password should not be empty"
    }
    // else if(!password_pattern.test(formValues.cpassword)){
    //     error.cpassword="Password didn't match"
    // }
    else if((formValues.password) !== (formValues.cpassword)){
        error.cpassword="Password didn't match"
    }
    else{
        error.cpassword=""
    }
    
    return error;
}

export default validation