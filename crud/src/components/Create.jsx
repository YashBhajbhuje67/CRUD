import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import './Create.css';

function Create() {
  const navigate = useNavigate();
  const datePickerId = new Date().toISOString().split("T")[0];

  const [value, setValue] = useState({
    roll_no: 0, f_name: "", l_name: "", age:0, email: "", dob: null, ph_no:0 });

  const finalSubmit = function (){
    axios.get(`/search?roll=${value.roll_no}`)
    .then((msg)=>{
      if(msg.data){
        alert(`Roll No.: ${value.roll_no} already exist !!`);
      }
      else{
        axios.post(`/create`,value)
        .then((msg)=>{
          alert(msg.data);
        })
        .catch((err)=>{
          console.log(err.message);
        });
      }
    })
    
  }
  const validate = function (){
    const currDate = new Date();
    value.dob = new Date(value.dob);
    value.roll_no = Number(value.roll_no);
    var age = currDate.getFullYear() - value.dob.getFullYear();
    if(value.dob.getMonth()>currDate.getMonth()){
      age-=1;
    }
    if (age<10){
      alert("Age should be atleast 10 !!");
      return false;
    }
    else{
      value.age = age;
    }
    if(value.roll_no===0){
      alert("Enter the Roll Number !");
      return false;
    }
    if (value.f_name.length===0 || value.l_name.length===0){
      alert("Name should not Empty !");
      return false;
    }
    if (value.email.length===0){
      alert("Email should not Empty !");
      return false;
    }
    return true;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(validate()){
      finalSubmit();
    }
  }
  const handleChange=(event)=>{
    const key=event.target.name, val = event.target.value;
    setValue({ ...value, [key]: val });
  };
  return (
    <div className="Create">
      {/* <button className="x" onClick={()=> navigate(-1)}>Back</button> */}
      {/* <h1>Enter Student Details</h1> */}
      <form className ="createform" onSubmit={(e) => handleSubmit(e)}>
      <label>Roll No</label>
      <input type='Number' placeholder="roll no" min= {1} name="roll_no" onChange={(e) => { handleChange(e); } } />
      
      <label>First Name</label>
      <input placeholder="First Name" name="f_name" onChange={(e) => { handleChange(e); } } />

      <label>Last Name</label>
      <input placeholder="Last Name" name="l_name" onChange={(e) => { handleChange(e); } } />

      <label>E-mail</label>
      <input type="email" placeholder="E-mail" name="email" onChange={(e) => { handleChange(e); } } />

      <label>Date of Birth</label>
      <input type='date' name="dob" max={datePickerId} onChange={(e) => { handleChange(e); } } />

      <label>Phone Number</label>
      <input type='number' placeholder="Phone number" name="ph_no" min={6000000000} max={9999999999} onChange={(e) => { handleChange(e); } } />

      <input className="submit" type="submit" value="Create"/> 
      </form>
    </div>
  )
}

export default Create
