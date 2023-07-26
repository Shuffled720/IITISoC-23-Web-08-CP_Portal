import React from 'react'

export default function ShowUserNote(props) {
  return (
    <>
    <div>Problem Name</div>
    <div>{props.todo.problem_name}</div>
    <div>Problem Tag</div>
    <div>{props.todo.problem_tag}</div>
    <div>User Note</div>
    <div>{props.todo.user_note}</div>
    </>
  )
}
