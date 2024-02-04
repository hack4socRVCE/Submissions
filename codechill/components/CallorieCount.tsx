"use client"
import React from 'react'
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";
import CountUp from 'react-countup';
const CallorieCount:React.FC = () => {
  return (
    <>
    <div className='font-bold pt-6'>
   <CountUp end={2000} duration={5} />
   <p>Calories</p>
   </div>
   </>
  )
}

export default CallorieCount
