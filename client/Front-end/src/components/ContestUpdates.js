import { Link } from "react-router-dom";
import Contestitem from "./Contestitem";
import { React, useEffect, useState } from "react";

export default function ContestUpdates() {
  const [contest, setContest] = useState();
  const fetchcontest = async () => {
    const url = `https://codeforces.com/api/contest.list?gym=false`;
    let data = await fetch(url);
    let parsedData = await data.json();
    parsedData.result.reverse();
    
    if(parsedData.result){
      setContest(parsedData.result);
    }
  };
  useEffect(() => {
    fetchcontest();
  }, []);
  
  return (
    <>
    <h3>Contest Updates:</h3>
    <br/>
    <h5>CodeFroces Contests:</h5>
   
            {contest&&contest.map((contests,key)=>(
              <>
              {contests.phase==="BEFORE"?
            <div>
             
            <Contestitem contest={contests}/>
            </div>
             :<></>
              } 
            
              </>
          ))}
    </>
  )
}
