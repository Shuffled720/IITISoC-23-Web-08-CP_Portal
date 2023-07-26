import {React, useEffect, useState} from 'react'

export default function Contestitem(props) {
    const [days , setdays] = useState(0)
    const [hours , sethours] = useState(0)
    const [mins , setmins] = useState(0)
    const [secs , setsecs] = useState(0)

    const deadline = new Date(props.contest.startTimeSeconds*1000);
    // const deadline = "July ,22 , 2023"

    const gettime=()=>{
        const time = Date.parse(deadline) -Date.now()
        setdays(Math.floor(time/(1000*60*60*24)))
        sethours(Math.floor(time/(1000*60*60)%24))
        setmins(Math.floor(time/(1000*60)%60))
        setsecs(Math.floor(time/(1000)%60))
    }
    useEffect(()=>{
        const interval = setInterval(()=>gettime(deadline),1000)
        return ()=> clearInterval(interval)

    },[])
   
  return (
    <div className='container'>
            Contest Name: {props.contest.name}
            <br/> 
            Contest Duration : {props.contest.durationSeconds/3600} hours
            <br/>
            Days Left : {days}
            <br/>
             Hours Left: {hours}
            <br/>
            Mins Left : {mins}
            <br/>
            Secs Left : {secs}
            <br/>
            <br/>
    </div>
  )
}
