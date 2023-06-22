import React from 'react'

export default function Home(props) {
  let myStyle = {
    color: props.mode ==='dark'?'white':'#042743',
    backgroundColor: props.mode ==='dark'?'rgb(36 74 104)':'white', 
}
  return (
    <div style={{color: props.mode ==='dark'?'white':'#042743'}}>Home</div>
  )
}
