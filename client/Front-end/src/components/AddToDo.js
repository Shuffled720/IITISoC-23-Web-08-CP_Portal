import React, {useContext, useState} from 'react'
import ToDoContext from "../context/todo/todoContext"
import ProblemNavbar from './ProblemNavbar';

const AddToDo = () => {
    const context = useContext(ToDoContext);
    const {addTodo} = context;

    const [todo, setTodo] = useState({problem_name: "", problem_tag: "", user_notes: "No notes added"})

    const handleClick = (e)=>{
        e.preventDefault();
        addTodo(todo.problem_name,todo.problem_tag,todo.user_notes);
    }

    const onChange = (e)=>{
        setTodo({...todo, [e.target.name]: e.target.value})
    }
    return (
        <>
        <ProblemNavbar/>
        <div className="container my-3">
            <h2>Add to To Do List</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Problem Name</label>
                    <input type="text" className="form-control" id="problem_name" name="problem_name" aria-describedby="emailHelp" onChange={onChange} required/> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Problem Tag</label>
                    <input type="text" className="form-control" id="problem_tag" name="problem_tag" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">User Note</label>
                    <input type="text" className="form-control" id="user_notes" name="user_notes" onChange={onChange} />
                </div>
               
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default AddToDo