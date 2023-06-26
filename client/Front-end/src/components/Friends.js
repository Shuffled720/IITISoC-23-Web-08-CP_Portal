import {React , useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';

export default function Friends() {
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
    <>{localStorage.getItem("token")?<div>
      <div>Friends</div>


    </div>:navigate('/login')}
    </>
  )
}
