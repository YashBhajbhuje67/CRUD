import React, { useState } from 'react'
import axios from 'axios';
import './Delete.css'
function Delete() {
  const [roll, setRoll] = useState(0);
  const [submitted, setSubmitted] = useState(null);

  const rollSearch = async function (){
    const msg = await axios.get(`/search?roll=${roll}`);
    if(msg.data){setSubmitted(true);}
    else{setSubmitted(false);}
  }

  const handleSubmit = async function (){
    const msg = await axios.delete(`/delete?roll=${roll}`);
    if (msg.data.deletedCount===1){
      alert("Deleted Successfully !!");
    }
    else{
      alert("Deletion Failed !");
    }
    setSubmitted(null);
  }
  return (
    <div className='delete'>
    <div className='searchCard'>
    <input type="Number" className='inputdelete' placeholder='Enter Roll No.' min={1} onChange={(e)=>{setRoll(e.target.value ? +e.target.value : 0);setSubmitted(null);}}/>
      <button type='submit' className='del' onClick={()=>{rollSearch()}}>Delete</button>
    </div>
      
    {submitted===null ? null : (submitted ? 
    <div className='delroll'>
    <h2 style={{margin:"50px"}}>Delete or not ?</h2>
    <button className='yesButton' onClick={()=>{handleSubmit()}}>Yes</button>
    <button className='noButton' onClick={()=>{setSubmitted(null)}}>No</button>
    </div> : 
    <h2>Roll No. {roll} Not Found !<br/>Please Create One.</h2>
    )}
    </div>
  )
}

export default Delete
