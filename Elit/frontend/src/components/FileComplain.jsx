import { useState,useEffect } from "react"
import { phoneNumberAtom } from "../atoms/Phone";
import { contractAtom } from "../atoms/Contract";
import { useRecoilState, useRecoilValue } from "recoil";
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


export default function FileComplain({state}){
    const navigateTo = useNavigate(); 

    const phone = useRecoilValue(phoneNumberAtom);
    const [contract,setContract] = useRecoilState(contractAtom);

    const[name,setName] = useState('');
    const[complainAddress,setComplainAddress] = useState('');
    const[complain,setComplain] = useState('');
    const[time,setTime] = useState('');
    // const [state,setState] =  useState({
    //     address : null,
    //     provider : null,
    //     signer : null,
    //     contract : null
    // });

    const[submit,setSubmit] = useState(false);
    // console.log(contract);

    // useEffect(() => {
    //     const connectWallet = async () => {
    //       const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    //       const contractabi = abi.abi;
    //       try {
    //         const { ethereum } = window;
        
    //         if (ethereum) {
    //           const account = await ethereum.request({ method: "eth_requestAccounts" });
    //         }
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const signer = provider.getSigner();
    //         const address = await signer.getAddress();
    //         const contract = new ethers.Contract(contractAddress, contractabi, signer);
    //         setState({ address, provider, signer, contract });
    //         // setContract({address, provider, signer, contract});
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //     connectWallet();

    // }, []);

    async function saveData(){
        setSubmit(true);
        const transaction = await state.contract.addComplains(name,complainAddress,complain,"123123123");
        await transaction.wait();
        toast.success('Transaction is done');
        console.log(name,complainAddress,complain);
        setTimeout(()=>{
            navigateTo('/');
        },2000);
    }

    return(
      <React.Fragment>
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
        <Toolbar sx={{bgcolor:"#870815"}} >
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6" color="white" noWrap>
            SECURE JURY
            </Typography>
            <Button
                variant="contained"
                sx={{ bgcolor: '#870815',color:'white','&:hover': {
                    bgcolor: '#ad6dd8'
                }}}
                onClick={saveData}
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
                    sx={{ bgcolor: '#870815',color:'white','&:hover': {
                        bgcolor: '#ad6dd8'
                    }}}
                      onClick={saveData}
                    > 
                    FILE COMPLAINt
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
            
        {/* <Copyright /> */}
        </Paper>
      </Container>
    </React.Fragment>
    )
}