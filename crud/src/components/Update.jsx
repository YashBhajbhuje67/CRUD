import React,{useState} from 'react';
import axios from 'axios';
import './Update.css';
function update() {

  const [roll, setRoll] = useState(0);
  const [isform, setIsform] = useState(null);
  const [prevValue, setPrevValue] = useState({});
  const [value, setValue] = useState({
    roll_no: 0, f_name: "", l_name: "", age:0, email: "", dob: null, ph_no:0 });

  const findRoll = async function (){
    const msg = await axios.get(`./search?roll=${roll}`)
    if(msg.data){
      const mssg = await axios.get(`./readone?roll=${roll}`);
      setPrevValue(mssg.data[0]);
      setIsform(true);
      console.log(prevValue);
    }
    else{setIsform(false);}
  }

  const updateSubmit = async function (){
    await axios.delete(`/delete?roll=${roll}`);
    axios.post(`/create`,value);
    alert("Update Successfully !");
  }

  const validate = function (){
    value.roll_no = roll;
    if(value.dob!==null){
      const currDate = new Date();
      value.dob = new Date(value.dob);
      // value.roll_no = Number(value.roll_no);
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
    }
    else{
      value.dob = prevValue.dob;
      value.age = prevValue.age;
    }
    
    if(value.f_name.length===0){value.f_name = prevValue.f_name;}
    if(value.l_name.length===0){value.l_name = prevValue.l_name;}
    if(value.email.length===0){value.email = prevValue.email;}
    if(value.ph_no===0){value.ph_no = prevValue.ph_no;}
    return true;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(validate()){
      updateSubmit();
    }
  }

  const handleChange=(event)=>{
    const key=event.target.name, val = event.target.value;
    setValue({ ...value, [key]: val });
  };

  return (
    <div className='update'>
      <div className='updateCard'>
        <input type="Number" className='roll' min={1} placeholder="Enter Roll No." onChange={((e)=>{setRoll(e.target.value ? +e.target.value : 0);setIsform(null);})}/>
        <button className='updateButton' onClick={(()=>{findRoll()})}>Find</button>
      </div>
      {isform===null ? null : (isform ? 
          <form className='updateForm' onSubmit={(e)=>{handleSubmit(e)}}>
            <label>First Name :<input name="f_name" placeholder={prevValue.f_name} onChange={(e)=>{handleChange(e)}}/></label>
            
            <label>Last Name :<input name='l_name' placeholder={prevValue.l_name} onChange={(e)=>{handleChange(e)}}/></label>
            
            <label>E-mail :<input name='email' type='email' placeholder={prevValue.email} onChange={(e)=>{handleChange(e)}}/></label>
            
            <label>Date of Birth :<input name='dob' type="date" onChange={(e)=>{handleChange(e)}}/></label>

            <label>Phone No.: <input type="number" name='ph_no' placeholder={prevValue.ph_no} onChange={(e)=>{handleChange(e)}}/></label>

            <input className="updatebutton" type="submit" value="Update"/>
          </form>
        :
        <h2>Roll No. {roll} Not Found.<br/>Please Create One.</h2>
      )}
    </div>
  )
}

export default update
