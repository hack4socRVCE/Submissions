import { useRecoilValue } from "recoil";
import { phoneNumberAtom } from "../atoms/Phone";
import { useState,useEffect } from "react";
import { ethers } from 'ethers';
import { Container,Col,Row } from "react-bootstrap";
import {Box} from "@mui/material";
<<<<<<< HEAD
import Particle from "./Particle";

export default function SeeComplain({state}){
    const phonenumber = useRecoilValue(phoneNumberAtom);
    console.log(phonenumber);
=======

export default function SeeComplain({state}){
    const phonenumber = useRecoilValue(phoneNumberAtom);
>>>>>>> 707300cb5b048bb34c58c47cea78b1991ae102c6
    const [complaints,setComplain] = useState([]);
    const[address,setAddress] = useState(null);
    useEffect(() => {
        const complainList = async()=>{
            try{
              const { ethereum } = window;
          
              if (ethereum) {
                const account = await ethereum.request({ method: "eth_requestAccounts" });
              }
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const address = await signer.getAddress();
              setAddress(address);
              const allComplaints = await state.contract.getPhoneComplaints();
              setComplain(allComplaints);
            }catch(error){
                console.log(error);
            }
          };
        complainList();
        //   console.log(`flight detials`);
    }, []);

    console.log(complaints);
    return(
    <Container fluid className="project-section">
<<<<<<< HEAD
      <Particle />
=======
      {/* <Particle /> */}
>>>>>>> 707300cb5b048bb34c58c47cea78b1991ae102c6
      <Container>
        <h1 className="project-heading">
          <strong className="purple">COMPLAINTS </strong>
        </h1>
<<<<<<< HEAD
        <Box sx={{my:8,mx: 20}}>
                {
                    complaints
                    .filter((item) => item.phone === phonenumber)
                    .map((item,index)=>(
=======
        <p style={{ color: "white" }}>
        COMPLAINTS
        </p>
        <Box sx={{my:8,mx: 20}}>
                {
                    complaints.map((item,index)=>(
>>>>>>> 707300cb5b048bb34c58c47cea78b1991ae102c6
                      <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around', // Adjusted to space-around for equal intervals
                        marginBottom: 2, // Adjusted for spacing between each container
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          textAlign:'left',
                          alignItems: 'center',
                          justifyContent: 'start',
                          border: 1,
                          borderRadius: 1,
                          background: "#d8d8d8",
                          width: "100%",
                          opacity: "100%",
                          paddingLeft:"1rem"
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
<<<<<<< HEAD
                          {<div>{item.id}</div>}
                          {<div key={item.id}><b>NAME  : </b>{item.name}</div>}
                          {<div key={item.id}><b>ADDRESS : </b>{item.complainAddress}</div>}
                          {<div key={item.id}><b>PHONE NUMBER : </b>{item.phone}</div>}
                          {<div key={item.id}><b>COMPLAIN : </b>{item.complain}</div>}
                          {<div key={item.id}><b>STATUS : </b>To be reviewed</div>}
=======
                          {<div key={item.name}><b>NAME  : </b>{item.name}</div>}
                          {<div key={item.name}><b>ADDRESS : </b>{item.complainAddress}</div>}
                          {<div key={item.name}><b>PHONE NUMBER : </b>{item.phone}</div>}
                          {<div key={item.name}><b>COMPLAIN : </b>{item.complain}</div>}
                          {<div key={item.name}><b>STATUS : </b>To be reviewed</div>}
>>>>>>> 707300cb5b048bb34c58c47cea78b1991ae102c6
                        </Box>
                      </Box>
                    </Box>
                        
                    ))
                }
            </Box>
      </Container>
    </Container>
    )
}