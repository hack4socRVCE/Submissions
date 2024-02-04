"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import Product from './page'
import { SparklesPreview } from '@/components/Loader'

const Main: React.FC  = () => {


    // useEffect(() => {
    //   // Simulate a 3-second delay
    //   const timer = setTimeout(() => {
    //     setLoading(false);
    //   }, 3000);
  
    //   return () => clearTimeout(timer);
    // }, []);
  return (
    <>
      {/* Display the SparklesPreview loader if still loading */}
      {/* {loading && <SparklesPreview />} */}

      {/* Display the Product component once loading is complete */}
      {/* {!loading && } */}
      <Product />
    </>
  )
}

export default Main
