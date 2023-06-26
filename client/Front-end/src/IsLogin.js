import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function IsLogin() {
    const navigate = useNavigate();
    
  return (<>
  if((localStorage.getItem('token')))
    {
      navigate('/login')
    }
  </>
    
  )
}
