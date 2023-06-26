import ToDoContext from "./todoContext";
import { useState } from "react";

const ToDoState = (props)=>{
  const host = "http://localhost:5000"
    const todoInitial =[]        
    const [todos, setTodo] = useState(todoInitial);

     // Get all Notes
  const getTodo = async () => {
    // API Call 
    const response = await fetch(`${host}/api/todo/fetchtodolist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setTodo(json)
  }

    // Add a To Do List Item
    const addTodo = async (problem_name,problem_tag,user_note)=>{
      const response = await fetch(`${host}/api/todo/addtodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note})
      });
      
      const todo = await response.json();
      setTodo(todos.concat(todo)) ;
    }

    // Delete a Note
    const deleteTodo = async (id)=>{
        // API Call
    const response = await fetch(`${host}/api/todo/deletetodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
        console.log("Deleting the todo with id" + id);
        const newTodos = todos.filter((todo)=>{return todo._id!==id})
        setTodo(newTodos)

    }
    // Edit a Note
    const editTodo = async (id, problem_name,problem_tag,user_note) => {
      // API Call 
      const response = await fetch(`${host}/api/todo/updatetodo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note})
      });
      const json = await response.json();
      let newTodos = JSON.parse(JSON.stringify(todos))
  
      // Logic to edit in client
      for (let index = 0; index < newTodos.length; index++) {
        const element = newTodos[index];
        if (element._id === id) {
          newTodos[index].problem_name = problem_name;
          newTodos[index].problem_tag = problem_tag;
          newTodos[index].user_note = user_note;
          break;
        }
      }
      setTodo(newTodos);
    }

    
    return (
        <ToDoContext.Provider value={{todos, deleteTodo,editTodo , addTodo , getTodo}}>
            {props.children}
        </ToDoContext.Provider>
    )
}

export default ToDoState;