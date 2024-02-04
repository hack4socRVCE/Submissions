import { useState } from "react"
import { phoneNumberAtom } from "../atoms/Phone";
import { useRecoilValue } from "recoil";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Particle = React.lazy(()=>import('./Particle'));

export default function FileComplain({state}){
    const navigateTo = useNavigate(); 

    const phone = useRecoilValue(phoneNumberAtom);

    const[name,setName] = useState('');
    const[complainAddress,setComplainAddress] = useState('');
    const[complain,setComplain] = useState('');
    const[time,setTime] = useState('');

    const[submit,setSubmit] = useState(false);

    async function saveData(){
        const randomID = Date.now().toString();
        const transaction = await state.contract.addComplains(randomID,name,complainAddress,complain,phone);
        await transaction.wait();
        setSubmit(true);
        toast.success('Transaction is done');
        console.log(name,complainAddress,complain);
        setTimeout(()=>{
            navigateTo('/');
        },2000);
    }

    return(
      <React.Fragment>
      <Particle/>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'absolute',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{bgcolor:"#e16327"}} >
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6" color="white" noWrap>
            SECURE JURY
            </Typography>
            <Button
                variant="contained"
                sx={{ bgcolor: '#272121',color:'white','&:hover': {
                    bgcolor: '#363333'
                }}}
                onClick={()=>{
                    navigateTo('/seecomplain')
                }}
            > 
                PREVIOUS COMPLAINTS
            </Button>
            </div>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ my:13,mb: 5 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },backgroundColor:"#",borderRadius:"12px" }}>
            <Typography component="h1" variant="h4" align="center">
                COMPLAIN FORM
            </Typography>
            {submit === false ? (
                <React.Fragment>
                <Typography variant="h6" gutterBottom sx={{mt:5}}>
                Fill in your details
                </Typography>
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        className = "textfield"
                        required
                        id="name"
                        name="name"
                        label="Enter full name"
                        fullWidth
                        variant="standard"
                        color='primary'
                        // sx={{ input: { color: 'white' } }}
                        // value={name || ''}
                        onChange={e=>setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required    
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        fullWidth
                        variant="standard"
                        color='primary'
                        value={phone}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="setComplainAddress"
                        name="address"
                        label="Enter your address"
                        fullWidth
                        variant="standard"
                        color='primary'
                        onChange={e=>setComplainAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="complain"
                        name="complain"
                        label="Enter your complaint"
                        fullWidth
                        variant="standard"
                        color='primary'
                        onChange={e=>setComplain(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="time"
                        name="time"
                        label="Enter the time (approx) of the incident"
                        fullWidth
                        variant="standard"
                        color='primary'
                        onChange={e=>setTime(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item  mt={5} xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                    variant="contained"
                    sx={{ bgcolor: '#e16327',color:'white','&:hover': {
                        bgcolor: '#363333'
                    }}}
                      onClick={saveData}
                    > 
                    FILE COMPLAINT
                    </Button>
                </Grid>
                <Toaster toastOptions={{ duration: 4000 }} />
                </React.Fragment>
            ):(
                <React.Fragment>
                    <Typography variant="h5" gutterBottom sx={{mt:5}}>
                        Your complaint has been registered
                    </Typography>
                    <Typography variant="subtitle1" sx={{mt:4}}>
                    Thank you for submitting your complaint. 
                    It has been successfully registered. The complaint will be processed soon.
                    Stay tuned for updates on the resolution progress!.
                    </Typography>
                </React.Fragment>
            )}
        </Paper>
      </Container>
    </React.Fragment>
    )
}