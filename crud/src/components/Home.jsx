import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

function Home() {
  return (
    <div className="home">
      <Link to="/create"><button className='homebtn'>Create</button></Link>
      <Link to="/read"><button className='homebtn'>Read</button></Link>
      <Link to="/update"><button className='homebtn'>Update</button></Link>
      <Link to="/delete"><button className='homebtn'>Delete</button></Link>
    </div>
  )
}

export default Home
