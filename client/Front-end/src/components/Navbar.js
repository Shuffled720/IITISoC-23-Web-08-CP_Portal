import React, {useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    const navigate = useNavigate();
    const handleLogOut =()=>{
        localStorage.removeItem('token');
        navigate('/');

    }

    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
      }, [location]);

    return (
      <>
<nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" >CodeCrafter</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/Profile"? "active": ""}`} aria-current="page" to="/Profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/CPWebsites"? "active": ""}`} aria-current="page" to="/CPWebsites">CP Websites</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/Problems"? "active": ""}`} aria-current="page" to="/Problems">Problems</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/ToDo"? "active": ""}`} aria-current="page" to="/ToDo">To Do</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/Favourites"? "active": ""}`} aria-current="page" to="/Favourites">Favourites</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/Friends"? "active": ""}`} aria-current="page" to="/Friends">Friends</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/Help"? "active": ""}`} aria-current="page" to="/Help">Help</Link>
                        </li>
                    </ul>
                    {/* <div className={`form-check form-switch mx-2 text-${props.mode==='light'?'dark':'light'}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
                       
                  </div> */}
                  { !localStorage.getItem('token')?
                    <div>
                            <Link type="button" className="btn btn-primary mx-1" to="/LogIn">Log In</Link>
                            <Link type="button" className="btn btn-primary mx-1" to="/SignUp">Sign Up</Link>
                    </div>:
                    
                   
                        <button type="button" className="btn btn-primary mx-1" onClick={handleLogOut}>Log Out</button>}
                     
                    
                  
                </div>
            </div>
        </nav>
      </>
    );
  }
  

