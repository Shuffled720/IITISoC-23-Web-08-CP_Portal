import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import CPWebsites from './components/CPWebsites';
import Problems from './components/Problems';
import ToDo from './components/ToDo';
import Favourites from './components/Favourites';
import Friends from './components/Friends';
import Help from './components/Help';
import LogOut from './components/LogOut';



import React, { useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <>
    <Router>
    <Navbar  mode={mode} toggleMode={toggleMode}  />
    <Alert alert={alert}/>
    <div className="container my-3">
    <Routes>
          
          <Route exact path='/' element={<Home mode={mode}/>}></Route>
          <Route exact path='/Profile' element={<Profile mode={mode}/>}></Route>
          <Route exact path='/CPWebsites' element={<CPWebsites mode={mode}/>}></Route>
          <Route exact path='/Problems' element={<Problems mode={mode}/>}></Route>
          <Route exact path='/ToDo' element={<ToDo mode={mode}/>}></Route>
          <Route exact path='/Favourites' element={<Favourites mode={mode}/>}></Route>
          <Route exact path='/Friends' element={<Friends mode={mode}/>}></Route>
          <Route exact path='/Help' element={<Help mode={mode}/>}></Route>
          <Route exact path='/LogOut' element={<LogOut mode={mode}/>}></Route>

    </Routes>
    </div>
    </Router>
    </> 
  );
}

export default App;
