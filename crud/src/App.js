import React from 'react';
import './App.css';
import Create from './components/Create'
import Delete from './components/Delete'
import Read from './components/Read'
import Update from './components/Update'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Home/>
        <Routes>
          <Route path='/create' element={<Create/>}/>
          <Route path='/read' element={<Read/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route path='/delete' element={<Delete/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
