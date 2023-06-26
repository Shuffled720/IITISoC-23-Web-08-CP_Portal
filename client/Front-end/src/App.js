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
import LogIn from './components/Login';
import SignUp from './components/SignUp';
import ToDoState from './context/todo/ToDoState';
import SubmitCode from './components/SubmitCode';
import ProblemViewer from './components/ProblemViewer';
import AddToDo from './components/AddToDo';
import AddFav from './components/AddFav';
import FavouriteState from './context/favourite/FavouriteState';



import React, { useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('dark'); // Whether dark mode is enabled or not
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
    <FavouriteState>
      
    <ToDoState>
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
          <Route exact path='/LogIn' element={<LogIn/>}></Route>
          <Route exact path='/SignUp' element={<SignUp/>}></Route>
          <Route exact path='ProblemViewer' element={<ProblemViewer/>}></Route>
          <Route exact path='/SubmitCode' element={<SubmitCode/>}></Route>
          <Route exact path='/AddToDo' element={<AddToDo/>}></Route>
          <Route exact path='/AddFav' element={<AddFav/>}></Route>

         
    </Routes>
    </div>
    </Router>

    </ToDoState>
    </FavouriteState>
    </> 
  );
}

export default App;
