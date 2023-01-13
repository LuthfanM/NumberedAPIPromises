import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// import { BASE_URL, MAX_URL } from "./constant";

const BASE_URL = 'https://dummyjson.com/products/'
const MAX_URL = 3;

function App() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const promises: any = [];
    let i = 0;
    while (i < MAX_URL) {
      promises.push(BASE_URL + (i + 1));
      i++;
    }
    
    axios
      .all(promises.map((endp) => axios.get(endp)))
      .then((result) => {console.log(result); setResponses(result)});
  }, []);  

  const getMostHigherData = () => {
    const temp = [];
    responses.map((val, index)=>{
      temp.push(val.data.price)
    })
    const highest = Math.max(...temp);
    let res = {}
    responses.map((val, index)=>{
      if(val.data.price === highest) 
        res = val.data;
    })
    
    return (<div><p>{res.title}</p><p>{res.price}</p></div>)
  };

  return (
    <div className="app">
      <div className="header">
        <div>
          <img src="https://storage.googleapis.com/coderpad_project_template_assets/coderpad_logo.svg" />
        </div>
        <div>
          <img src="https://storage.googleapis.com/coderpad_project_template_assets/react.svg" />
          <span>React App</span>
        </div>
      </div>
      <div className="content">{getMostHigherData()}</div>      
    </div>
  );
}

export default App;
