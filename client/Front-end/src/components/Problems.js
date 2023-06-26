import {React , useEffect} from 'react'
import { Link } from "react-router-dom";
import ProblemViewer from './ProblemViewer'
import {  useNavigate } from 'react-router-dom';

export default function Problems() {
  const navigate = useNavigate();
  useEffect(() => {
    if((localStorage.getItem('token')))
  {
    // getfav()
  }
  else
  {
    navigate('/login');
  }
}, [])
  
  return (
    <>
    {localStorage.getItem("token")?<div>
    <div className='my-3'><h2>Problems</h2></div>
    <input class="form-control my-2" type="text" placeholder="Initial Difficulty" aria-label="default input example"></input>
    <input class="form-control my-2" type="text" placeholder=" Final Difficulty" aria-label="default input example"></input>
      <select class="form-select" aria-label="Default select example">
    <option selected>Add tag</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <Link type="button " className="btn btn-primary mx-1 my-3" to ="/ProblemViewer">Search</Link>

  </div>:navigate('/login')}
    </>
  )
}
