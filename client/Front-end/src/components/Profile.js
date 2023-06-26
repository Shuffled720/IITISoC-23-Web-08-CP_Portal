import {React , useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';

export default function Profile() {
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
      <div>Profile</div>


    </div>:navigate('/login')}
    </>
  )
}
