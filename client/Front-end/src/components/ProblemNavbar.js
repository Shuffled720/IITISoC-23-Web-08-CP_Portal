import React from 'react'
import { Link } from "react-router-dom";

export default function ProblemNavbar(props) {
  return (
    <>
    <Link type="button" className="btn btn-primary mx-1" to="/ProblemViewer">Problem</Link>
    <Link type="button" className="btn btn-primary mx-1" to="/SubmitCode">Submit Code</Link>
    <Link type="button" className="btn btn-primary mx-1" to="/AddToDo">Add to To Do List</Link>
    <Link type="button" className="btn btn-primary mx-1" to="/AddFav">Add to Favourites</Link>
    <h3>{props.problem_name}</h3>
    </>
  )
}
