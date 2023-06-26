import React from 'react'
import ProblemNavbar from './ProblemNavbar';
import { Link } from "react-router-dom";

export default function SubmitCode() {
  return (
    <>
        <ProblemNavbar problem_name="Arnav"/>
        <div class="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label my-1">Submit your chode here</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <Link type="button" className="btn btn-primary mx-1" >Submit</Link>

    </>

  )
}
