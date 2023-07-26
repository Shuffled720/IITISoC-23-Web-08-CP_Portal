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
import ProblemViewer from './components/ProblemViewer';
import FavouriteState from './context/favourite/FavouriteState';
import UserState from './context/user/UserState';
import React, { useState } from 'react';
import Alert from './components/Alert';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AlertState from './context/alert/AlertState';
import ShowUserNote from './components/ShowUserNote';
import ProblemState from './context/problems/ProblemState';
import FriendState from './context/friend/FriendState';
import Users from './components/Users';


function App() {
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
  const name1="";

  return (
    <>
    <FriendState>

    <ProblemState>
    <AlertState>
     <UserState>
    <FavouriteState>
    <ToDoState>


    <Router>
    <Navbar  />
    <Alert alert={alert}/>
    <div className="container my-3">
    <Routes>
          
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/Profile' element={<Profile />}></Route>
          <Route exact path='/CPWebsites' element={<CPWebsites/>}></Route>
          <Route exact path='/Problems' element={<Problems />}></Route>
          <Route exact path='/ToDo' element={<ToDo />}></Route>
          <Route exact path='/Favourites' element={<Favourites />}></Route>
          <Route exact path='/Friends' element={<Friends />}></Route>
          <Route exact path='/Help' element={<Help />}></Route>
          <Route exact path='/LogIn' element={<LogIn/>}></Route>
          <Route exact path='/SignUp' element={<SignUp/>}></Route>
          <Route exact path='ProblemViewer' element={<ProblemViewer/>}></Route>
          <Route exact path={`/Users/:username/:friendid`} element={<Users/>}></Route>
          <Route exact path='/ShowUserNote' element={<ShowUserNote/>}></Route>


         
    </Routes>
    </div>
    </Router>

    </ToDoState>
    </FavouriteState>
    </UserState> 
    </AlertState>
    </ProblemState>
    </FriendState>
    </> 
  );
}

export default App;
