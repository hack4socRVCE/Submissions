// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { getDocs ,addDoc, collection } from "firebase/firestore";
// import { auth, db } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { storage } from "../config/firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";

// const formStyle = {
//   maxWidth: "400px",
//   margin: "0 auto",
//   padding: "20px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",
// };

// const errorStyle = {
//   color: "red",
// };

// const containerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginTop: "20px",
// };

// const buttonStyle = {
//   backgroundColor: "#4285F4",
//   color: "#fff",
//   padding: "10px 20px",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// function OverallSubmit() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   const [file, setFile] = useState("");
//   const [fileUpload, setFileUpload] = useState(null);
//   const [percent, setPercent] = useState(0);
//   const [fileLink, setFileLink] = useState("");
//   const [vendorlist, setVendors] = useState([]);
//   const [vendor, setvendor] = useState(null);
//   const postsRefV = collection(db, "vendors");

//    const getDocdata = async()=>{
//     const data = await getDocs(postsRefV);
//     console.log(data.docs[0].data())
//     let i=0;
// let vendors = [];
//     for ( i = 0; i < data.docs.length; i++) {
//         vendors[i] = '('+data.docs[i].data().store_name + ', ' + data.docs[i].data().address+')';
//   }
//   setVendors(vendors);
//    }
//   useEffect(()=>{
    
//     getDocdata();
    
// }, []);

//   const schema = yup.object().shape({
//     cost: yup.number(),
//     type: yup.string(),
//     ordernumber: yup.number(),
//     orderdetails: yup.string(),
//     paymentMode: yup.string(),
//     paymentstatus: yup.bool(),
//     timestamp: yup.date().default(() => new Date()),
//     transactionid: yup.string(),
//     vendor: yup.string(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const postsRef = collection(db, "orders");

//   const onSubmitOrder = async (data) => {
//     console.log(fileLink);
//     await addDoc(postsRef, {
//       ...data,
//       size: fileUpload.size,
//       filepath: fileLink,
//       user: user?.displayName,
//       userid: user?.uid,
//       completeStatus: false,
//     });

//     navigate("/");
//   };




  // function handleChange(event) {
  //   setFileUpload(event.target.files[0]);
  // }
  

  // const handleUpload = () => {
  //   if (!fileUpload) {
  //     alert("Please upload the file first!");
  //   }

  //   const newFilename = `/files/${v4() + fileUpload.name}`;
  //   const storageRef = ref(storage, newFilename);
  //   // const uploadTask =
  //   const uploadTask = uploadBytesResumable(storageRef, fileUpload);
  //   //   .then((snapshot) => {
  //   //   alert("File Uploaded");
  //   // });

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setPercent(percent);
  //       setFileLink(newFilename);
  //       console.log(newFilename);
  //       navigate("/submitorder");
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //       });
  //     }
  //   );
  // };




//   return (
//     <div>
//       <form style={formStyle} onSubmit={handleSubmit(onSubmitOrder)}>
//         <input
//           style={inputStyle}
//           placeholder="COST...."
//           {...register("cost")}
//         />
//         <p style={errorStyle}>{errors.cost?.message}</p>
//         <input
//           style={inputStyle}
//           placeholder="Document Type"
//           {...register("type")}
//         />
//         <p style={errorStyle}>{errors.type?.message}</p>
//         <input
//           style={inputStyle}
//           placeholder="Order Number"
//           {...register("ordernumber")}
//         />
//         <p style={errorStyle}>{errors.ordernumber?.message}</p>
//         <input
//           style={inputStyle}
//           placeholder="Order Details"
//           {...register("orderdetails")}
//         />
//         <p style={errorStyle}>{errors.orderdetails?.message}</p>
//         <input
//           style={inputStyle}
//           placeholder="Payment Mode"
//           {...register("paymentMode")}
//         />
//         <p style={errorStyle}>{errors.paymentMode?.message}</p>
        
        
//         {/* <input style={inputStyle} placeholder="Size" {...register("size")} />
//         <p style={errorStyle}>{errors.size?.message}</p> */}
//         {/* <input
//           style={inputStyle}
//           type="date"
//           placeholder="TimeStamp"
//           {...register("timestamp")}
//         />
//         <p style={errorStyle}>{errors.timestamp?.message}</p> */}
        
//         <div>List of vendors = {vendorlist}</div>
       
//         <input
//           style={inputStyle}
//           placeholder="Vendor"
//           type=''
//           {...register("vendor")}
//         />


      
//         <p style={errorStyle}>{errors.vendor?.message}</p>

//         <input type="submit" style={inputStyle} />
//       </form>
//       <div style={containerStyle}>
//         <input type="file" onChange={handleChange} style={inputStyle} />
//         <button onClick={handleUpload} style={buttonStyle}>
//           Upload to Firebase
//         </button>
//         <p>{percent}% done</p>
//       </div>
//     </div>
//   );
// }

// export default OverallSubmit;


import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {  db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from 'axios';
//import {} from "webhdfs";
const formStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
};

const buttonStyle = {
  backgroundColor: "#4285F4",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const errorStyle = {
  color: "red",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
};

function OverallSubmit() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

    const [file, setFile] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [percent, setPercent] = useState(0);
  const [fileLink, setFileLink] = useState("");

 

  const schema = yup.object().shape({
    color: yup.string().required("Color is required"),
    paperType: yup.string().required("Paper type is required"),
    timestamp: yup.date().default(() => new Date()),
    printMode: yup.string().required("Print mode is required"),
    description: yup.string(),
    vendor: yup.string().required("Vendor is required"),
    // Add other validations as needed
    // ...

    // Retain existing validations
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

   const [vendorlist, setVendors] = useState([]);
   const [cost, setCost] = useState(0);
   const [vendorEmail, setVendorEmail] = useState('');

  const getDocdata = async()=>{
   const postsRefV = collection(db, "vendors");
    const data = await getDocs(postsRefV);
    console.log(data.docs[0].data())
    let i=0;
let vendors = [];

    for ( i = 0; i < data.docs.length; i++) {
        vendors[i] = data.docs[i].data().store_name + ', ' + data.docs[i].data().address +'---' + data.docs[i].data().email  ;
  }
  setVendors(vendors);

   }
  useEffect(()=>{
    
    getDocdata();
    
}, []);// Add your list of vendors

  const postsRef = collection(db, "orders");

  // const calculateCost = (data) => {
  //   // Implement your cost calculation logic based on parameters
  //   // For example, per page cost for black and white is 1 rs, color is 5 rs
  //   const blackAndWhiteCost = 1 * data.size; // Adjust this based on your actual cost
  //   const colorCost = 5 * data.size; // Adjust this based on your actual cost

  //   // Set cost based on color selection
  //   data.cost = data.color === "blackAndWhite" ? blackAndWhiteCost : colorCost;
  //   data.cost = data.paperType === "a3" ? data.cost * 2: data.cost;
  //   setCost(data.cost);
  // };

  const onSubmitOrder = async (data) => {
    //calculateCost(data);

    await addDoc(postsRef, {
      ...data,
      user: user?.displayName,
      userid: user?.uid,
      size: fileUpload.size,
      filepath: fileLink,
      filename: fileUpload.name,
      completeStatus: false,
      vendor_id: vendorEmail
    });
   alert('Order placed ') 
    navigate("/");
  };  
  
  function handleChange(event) {
    setFileUpload(event.target.files[0]);
  }

  const handleUploadHDFS = async () => {
    try { 
      const formData = new FormData();
      formData.append('file', fileUpload);
      console.log(fileUpload);

      // Replace 'YOUR_WEBHDFS_ENDPOINT' with the actual WebHDFS endpoint
      const webHdfsEndpoint = 'http://192.168.204.50:9870';
     // const uploadUrl = "http://192.168.204.50:9870/webhdfs/v1/new_dir/lol.txt?user.name=hduser&op=create";
     const uploadUrl = `http://192.168.204.52:9864/webhdfs/v1/${user.uid}/${fileUpload.name}?op=CREATE&user.name=hduser&namenoderpcaddress=master:9000&createflag=&createparent=true&overwrite=false`
      // Make a POST request to upload the file
      //await axios.put(uploadUrl, formData, {maxRedirects: 3} ).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
   // await axios.get("http://192.168.204.50:9870/webhdfs/v1/filenew.txt?user.name=hduser&op=GETFILESTATUS").then((res)=>{console.log(res)})
     fetch(uploadUrl, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
     }).then((res)=>{
      console.log(res)
      if(res.redirected){
        console.log(res.url)
      }
    
    }).catch((err)=>{console.log(err)});

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading to hdfs')
    }
    

  };
  
  const handleVendorSelect =(e)=>{
    const selectedVendor = e.target.value;
    
    // Find the selected vendor's email from the vendor list
    const selectedVendorData = vendorlist.find((vendor) => vendor === selectedVendor);

    if (selectedVendorData) {
      // Extract the email from the selected vendor's data
      const selectedVendorEmail = selectedVendorData.split('---')[1];
      setVendorEmail(selectedVendorEmail);
    }
  }

  const handleUpload = async() => {

    if (!fileUpload) {
      alert("Please upload the file first!");
    }
    await handleUploadHDFS();
    const newFilename = `/files/${v4() + fileUpload.name}`;
    const storageRef = ref(storage, newFilename);
    // const uploadTask =
    const uploadTask = uploadBytesResumable(storageRef, fileUpload);
    //   .then((snapshot) => {
    //   alert("File Uploaded");
    // });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
        setFileLink(newFilename);
        console.log(newFilename);
        navigate("/submitorder");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };



  return (
    <div>
      <div style={containerStyle}>
        <input type="file" onChange={handleChange} style={inputStyle} />
        <button onClick={handleUpload} style={buttonStyle}>
          Upload
        </button>
        <p>{percent}% done</p>
        {/* <button onClick={handleUploadHDFS} style={buttonStyle}>
          Upload HDFS
        </button> */}
      </div>
      
      <form style={formStyle} onSubmit={handleSubmit(onSubmitOrder)}>
        {/* Add new input fields for parameters */}
        <div>Color</div>
        <select style={inputStyle} {...register("color")}>
        <option value="--">--</option>
          <option value="blackAndWhite">Black and White</option>
          <option value="color">Color</option>
        </select>
        <p style={errorStyle}>{errors.color?.message}</p>
<div>Paper type</div>
        <select style={inputStyle} {...register("paperType")}>
        <option value="--">--</option>
          <option value="a4">A4</option>
          <option value="a3">A3</option>
          {/* Add other paper types as needed */}
        </select>
        <p style={errorStyle}>{errors.paperType?.message}</p>
<div>Print mode</div>
        <select style={inputStyle} {...register("printMode")}>
        <option value="--">--</option>
          <option value="singleSide">Single Side</option>
          <option value="doubleSide">Double Side</option>
          {/* Add other print modes as needed */}
        </select>
        <p style={errorStyle}>{errors.printMode?.message}</p>
<div>Custom description</div>
        
        <input
          style={inputStyle}
          placeholder=""
          {...register("description")}
        />
         <p style={errorStyle}>{errors.description?.message}</p>
<div>Printing vendor</div>
        <select style={inputStyle} {...register("vendor")} onChange={handleVendorSelect}>
        <option value="--">--</option>
          {vendorlist.map((vendor) => (
            <option key={vendor} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>
        <p style={errorStyle}>{errors.vendor?.message}</p>
        {/* <div>Cost - {cost}</div> */}

        {/* Retain existing input fields */}
        {/* ... */}

        <input type="submit" style={inputStyle} />
      </form>
      
    </div>
  );
}

export default OverallSubmit;