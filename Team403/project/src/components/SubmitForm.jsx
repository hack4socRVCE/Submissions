
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

// function SubmitForm() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   const schema = yup.object().shape({
//     cost: yup.number(),
//     type: yup.string(),
//     ordernumber: yup.number(),
//     orderdetails: yup.string(),
//     paymentMode: yup.string(),
//     paymentstatus: yup.bool(),
//     size: yup.number(),
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

  

//   const onSubmitOrder = async (data) => {
//     await addDoc(postsRef, {
//       ...data,
//       user: user?.displayName,
//       userid: user?.uid,
//     });

//     navigate("/");
//   };

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
//         <input
//           style={inputStyle}
//           // type="checkbox"
//           placeholder="Payment Status"
//           {...register("paymentstatus")}
//         />
//         <p style={errorStyle}>{errors.paymentstatus?.message}</p>
//         <input style={inputStyle} placeholder="Size" {...register("size")} />
//         <p style={errorStyle}>{errors.size?.message}</p>
//         <input
//           style={inputStyle}
//           type="date"
//           placeholder="TimeStamp"
//           {...register("timestamp")}
//         />
//         <p style={errorStyle}>{errors.timestamp?.message}</p>
//         <input
//           style={inputStyle}
//           placeholder="Transaction ID"
//           {...register("transactionid")}
//         />
//         <p style={errorStyle}>{errors.transactionid?.message}</p>
//         <input
//           style={inputStyle}
//           placeholder="Vendor"
//           {...register("vendor")}
//         />
//         <p style={errorStyle}>{errors.vendor?.message}</p>

//         <input type="submit" style={inputStyle} />
//       </form>
//     </div>
//   );
// }

// export default SubmitForm;


// Import statements remain the same
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

const formStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const errorStyle = {
  color: "red",
};

function SubmitForm() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

 

  const schema = yup.object().shape({
    color: yup.string().required("Color is required"),
    paperType: yup.string().required("Paper type is required"),
    paymentMode: yup.string().required("Payment mode is required"),
    printMode: yup.string().required("Print mode is required"),
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

  const getDocdata = async()=>{
   const postsRefV = collection(db, "vendors");
    const data = await getDocs(postsRefV);
    console.log(data.docs[0].data())
    let i=0;
let vendors = [];
    for ( i = 0; i < data.docs.length; i++) {
        vendors[i] = '('+data.docs[i].data().store_name + ', ' + data.docs[i].data().address+')';
  }
  setVendors(vendors);

   }
  useEffect(()=>{
    
    getDocdata();
    
}, []);// Add your list of vendors

  const postsRef = collection(db, "orders");

  const calculateCost = (data) => {
    // Implement your cost calculation logic based on parameters
    // For example, per page cost for black and white is 1 rs, color is 5 rs
    const blackAndWhiteCost = 1 * data.size; // Adjust this based on your actual cost
    const colorCost = 5 * data.size; // Adjust this based on your actual cost

    // Set cost based on color selection
    data.cost = data.color === "blackAndWhite" ? blackAndWhiteCost : colorCost;
    data.cost = data.paperType === "a3" ? data.cost * 2: data.cost;
    setCost(data.cost);
  };

  const onSubmitOrder = async (data) => {
    calculateCost(data);

    await addDoc(postsRef, {
      ...data,
      user: user?.displayName,
      userid: user?.uid,
    });
   alert('Order placed - Tentative cost is '+ cost)
    navigate("/");
  };

  return (
    <div>
      <form style={formStyle} onSubmit={handleSubmit(onSubmitOrder)}>
        {/* Add new input fields for parameters */}
        <select style={inputStyle} {...register("color")}>
          <option value="blackAndWhite">Black and White</option>
          <option value="color">Color</option>
        </select>
        <p style={errorStyle}>{errors.color?.message}</p>

        <select style={inputStyle} {...register("paperType")}>
          <option value="a4">A4</option>
          <option value="a3">A3</option>
          {/* Add other paper types as needed */}
        </select>
        <p style={errorStyle}>{errors.paperType?.message}</p>

        <select style={inputStyle} {...register("paymentMode")}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          {/* Add other payment modes as needed */}
        </select>
        <p style={errorStyle}>{errors.paymentMode?.message}</p>

        <select style={inputStyle} {...register("printMode")}>
          <option value="singleSide">Single Side</option>
          <option value="doubleSide">Double Side</option>
          {/* Add other print modes as needed */}
        </select>
        <p style={errorStyle}>{errors.printMode?.message}</p>

        <select style={inputStyle} {...register("vendor")}>
          {vendorlist.map((vendor) => (
            <option key={vendor} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>
        <p style={errorStyle}>{errors.vendor?.message}</p>
        <div>Cost - {cost}</div>

        {/* Retain existing input fields */}
        {/* ... */}

        <input type="submit" style={inputStyle} />
      </form>
    </div>
  );
}

export default SubmitForm;

