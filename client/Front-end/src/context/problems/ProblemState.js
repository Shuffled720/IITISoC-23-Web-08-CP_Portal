import ProblemContext from "./problemContext";
import { useState } from "react";

const ProblemState = (props)=>{
//   const host = "http://localhost:5000"
    const problemInitial =[]        
    const [problems, setProblem] = useState(problemInitial);

    // Get all problems
    const getProblem = async (tag) => {
    const url = `https://codeforces.com/api/problemset.problems?tags=${tag}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    if(parsedData.result){
      setProblem(parsedData.result.problems);
    }
  }
  return (
    <ProblemContext.Provider value={{problems, getProblem}}>
        {props.children}
    </ProblemContext.Provider>
)
}

export default ProblemState;