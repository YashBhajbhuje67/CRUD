import React,{useState, useEffect} from 'react'
import './Read.css';
import axios from 'axios';

function Read() {
  const [read, setRead] = useState(0);
  var [display, setDisplay] = useState([]);
  useEffect(()=>{
    const fetchData = async function (){
      if(read==0){
        const msg = await axios.get(`/readall`)
        setDisplay(msg.data);
      }
      else{
        const msg = await axios.get(`/search?roll=${read}`)
          if(msg.data){
            const msgg = await axios.get(`/readone?roll=${read}`);
            setDisplay([{roll_no: msgg.data[0].roll_no, name: msgg.data[0].f_name+" "+msgg.data[0].l_name, age: msgg.data[0].age, email: msgg.data[0].email}]);
          }
          else{
            setDisplay([]);
          }
      }
      
    }
    fetchData();
  },[read])
  
  return (
    <div className='read'>
    
    <input type='Number' className='inputRead'  placeholder='Enter Roll No' min={1} onChange={(e)=>{setRead(e.target.value ? +e.target.value : 0);}}/>

    {display.length===0 ? <h2 style={{textAlign: "center"}}>Data Not Found !</h2> : 
      <table>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {display.map((data)=>{
              return(
                <tr>
                  <td>{data.roll_no}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.email}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    }
    </div>
  )
}

export default Read
