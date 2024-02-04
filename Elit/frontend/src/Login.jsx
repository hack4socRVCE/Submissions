import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.config";
import OtpInput from "otp-input-react";
import { useRecoilState } from 'recoil';
import { phoneNumberAtom } from './atoms/Phone';
import Particle from './components/Particle';
import homeLogo from "./Assets/home-main.svg";

const defaultTheme = createTheme();

export default function LogIn() {
  // const [user,setUser] = React.useState();
  const [phone,setPhone] = React.useState("");
  const [optStatus,setOtpStatus] = React.useState(false);
  const [user,setUser] = React.useState("")
  const [otp,setOtp] = React.useState("")
  const navigateTo = useNavigate();
  const [count,setCount] = useRecoilState(phoneNumberAtom)

  async function handleSubmit(event){
    event.preventDefault();
    const fullPhone = "+91" + phone;
    try{
      const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{})
      const confirmation = await signInWithPhoneNumber(auth,fullPhone,recaptcha);
      // console.log(confirmation);
      toast.success('Otp sent successfully');
      setUser(confirmation);
      setCount(phone);
      setTimeout(()=>{
        setOtpStatus(true);
      },3000);
    }catch(err){
      toast.error('Error sending otp! Try again later')
      console.log(err);
    }
    // setCount(phone);
    // setOtpStatus(true);
  }

  async function handleOtpSubmit(event){
    event.preventDefault();
    try{
      await user.confirm(otp)
      toast.success('Otp Verified')
      setTimeout(()=>{
        navigateTo('/FileComplain')
      },2000)
    }catch(err){
      console.log(err);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!optStatus ? (
            <>
                    <div className="text-emerald-500 w-fit mx-auto rounded-full overflow-hidden">
                      <img
                        src={homeLogo}
                        alt="Your Alt Text"
                        className="img-fluid"
                        style={{ height: '200px', borderRadius: '50%' }}
                      />
                    </div>
                    <Typography component="h1" variant="h5" sx={{color:'white'}}>
                      Log in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phone_number"
                        label="Phone Number"
                        variant='outlined'
                        type="number"
                        id="phone_number"
                        onChange={(e)=>setPhone(e.target.value)}
                        sx={{background:'#838281'}}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor:"#e06327",'&:hover': {
                          bgcolor: '#363333'}}}
                        onClick={handleSubmit}
                      >
                        SEND OTP
                      </Button>
                      <div style={{marginTop:"2px"}}id="recaptcha"></div>
                      <Toaster toastOptions={{ duration: 2000 }} />
                    </Box>
                    </>
          ):(
              <>
                      <div className="text-emerald-500 w-fit mx-auto  rounded-full">
                      <img src={homeLogo} alt="Your Alt Text" style={{ height: '200px' }} />
                      </div>
                      <Typography component="h1" variant="h5" sx={{color:'white'}}>
                        Enter Otp
                      </Typography>
                      <Box component="form" noValidate sx={{ mt: 1 }}>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '2px',
                        }}
                        sx={{background:'#838281'}}
                        className="flex-1 py-5 outline-none"
                      ></OtpInput>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor:"#e06327",'&:hover': {
                          bgcolor: '#363333'}}}
                        onClick={handleOtpSubmit}
                      >
                        VERIFY OTP
                      </Button>
                      <Toaster toastOptions={{ duration: 2000 }} />
                    </Box>
              </>
          )
          }
        </Box>
        <Particle/>
      </Container>
    </ThemeProvider>
  );
}
