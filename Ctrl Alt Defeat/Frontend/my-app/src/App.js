import Routerz from "./navbar";
import "./css/app.css"
import "./css/input.css"
import React, { useEffect, useState } from "react";
import { CgSearchLoading } from "react-icons/cg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {

  const [data, setData] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [history, setHistory]= useState([]);
  const[sometext,setState]=useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [submit, setSubmit] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    insertArticle()
    setState('')
  }
  
  //Data insertion 
  function InsertArticle(body){
      return fetch(`http://127.0.0.1:5000/modelinput`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
    .then(jsonData => {
      fetchNewVideo();
      // setSubmit(true)
      fetchData1();
      })
    .catch(error => console.log(error))
    }
  
    const insertArticle = () =>{
          InsertArticle({sometext})
          .then((response) => InsertArticle(response))
          .catch(error => console.log('error',error))
        }
  
  //text data fetching
  useEffect(() =>{
    fetchData();
  },[]);


  const fetchData = async ()=>{
    try{
      const response=await fetch('http://127.0.0.1:5000/modeltextoutput')
      const jsonData=await response.json();
      setData(jsonData)
    }catch(error){
      console.log("Error",error)
    }
    
  }
   
  //history data fetch
  useEffect(() =>{
    fetchData1();
  },[]);


  const fetchData1 = async ()=>{
    try{
      const response=await fetch('http://127.0.0.1:5000//history')
      const jsonData=await response.json();
      setHistory(jsonData)
    }catch(error){
      console.log("Error",error)
    }
    
  }

  const fetchNewVideo = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/modelvideoutput');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob(); 
      const videoUrl = URL.createObjectURL(blob);
      console.log(videoUrl);
      setVideoSrc(videoUrl);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
     <div className="navhead">
     <Routerz/>
     </div>
     <h1 className="videoheader">Visual Analysis</h1>
      {/* <h2 style={{ marginLeft: '500px' }}>Video :</h2> */}
        <div className="videoplayer">
        {
          // !submit ? <div className="loading">
          //   <div>
          //   <CgSearchLoading size={80} />
          //   <h1 style={{marginLeft:"-90px",marginTop:"50px"}}>Search somthing</h1>
          //   </div>
          //   </div> : 
            isLoading ? 
            <div className="loading">
              <AiOutlineLoading3Quarters size={80} />
              <h1 style={{marginLeft:"-20px",marginTop:"50px"}}>Loading..</h1>
              </div> : 
            <video controls width="600" height="400" src={videoSrc}></video>
        }
                </div>
      <div className="textoutput">
      {/* <p className="Text2">{data}</p> */}
      </div>
      <div className="divvv">
           <h1>hi</h1>
           <h1>hi</h1>
      </div>
      <div className="divvvv">
        <h2 style={{textAlign:"center",marginBottom:"40px"}}>History</h2>
        {/* {history.map((element, index) => {
        return (
          <ul>
          <div key={index}>
            <li className="element"> {element.slice(0, 30)}</li>
          </div>
          </ul>
        )
      })} */}
      {history.map((element, index) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('copied');
        
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
      });
  };

  return (
    <ul key={index}>
      <li onClick={() => handleCopy(element)} className="element"style={{ cursor: 'pointer' }}>
      {element.slice(0, 30)}..
      </li>
    </ul>
  );
})}

      </div>
      <div className="inputdiv">
      </div>
      <div className="input-container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your text here  to visualize..."
        className="text-input"
        value={sometext}
        onChange={event => {
            setState(event.target.value)
          }
        }
      />
      <button className="submitbutton" type='submit'>submit</button>
      </form>
    </div>
      
    </div>
  );
}

export default App;
