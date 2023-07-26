import ToDoContext from "./todoContext";
import { useState } from "react";

const ToDoState = (props)=>{
  const host = "http://localhost:5000"
    const todoInitial =[]        
    const [todos, setTodo] = useState(todoInitial);
    const [todosearch, setSearch] = useState(todoInitial);
     // Get all to do list items
  const getTodo = async () => {
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
    const addTodo = async (problem_name,problem_tag,user_note,contestId, problem_index)=>{
      const response = await fetch(`${host}/api/todo/addtodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note, contestId, problem_index})
      });
      
      const todo = await response.json();
      setTodo(todos.concat(todo)) ;
    }

    // Delete a to do list item
    const deleteTodo = async (id)=>{
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
    // Edit a to do list item
    const editTodo = async (id, problem_name,problem_tag,user_note,contestId, problem_index) => {
      const response = await fetch(`${host}/api/todo/updatetodo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note,contestId, problem_index})
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
          newTodos[index].contestId = contestId;
          newTodos[index].problem_index = problem_index;
          break;
        }
      }
      setTodo(newTodos);
    }

    // search a to do list item
    const searchTodo = async (problemname)=>{
      const response = await fetch(`${host}/api/todo/searchtodo/${problemname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = response.json();
      console.log(json)
         
       
          setSearch(json);
  
      }

    
    return (
        <ToDoContext.Provider value={{todos, deleteTodo,editTodo , addTodo , getTodo , searchTodo , todosearch}}>
            {props.children}
        </ToDoContext.Provider>
    )
}

export default ToDoState;