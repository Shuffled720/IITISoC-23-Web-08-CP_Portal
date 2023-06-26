import React from 'react'

export default function ShowUserNote(props) {
  return (
    <>
    <div>Problem Name</div>
    <div>{props.problem_name}</div>
    <div>Problem Tag</div>
    <div>{props.problem_tag}</div>
    <div>User Note</div>
    <div>{props.user_note}</div>
    </>
  )
}
