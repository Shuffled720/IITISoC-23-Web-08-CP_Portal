import React, { useContext, useEffect, useRef, useState } from "react";
import todoContext from "../context/todo/todoContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShowUserNote from "./ShowUserNote.js";


export default function ToDo() {
  const navigate = useNavigate();
  const context = useContext(todoContext);
  const { todos, deleteTodo, getTodo, editTodo } = context;
  const [todo, setTodo] = useState({
    id: "",
    eproblem_name: "",
    eproblem_tag: "",
    euser_note: "No notes added",
    econtestId:"",
    eproblem_index:""
  });
  let a = 0;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodo();
    } else {
      console.log("yes");
      navigate("/login");
    }
  }, []);
  const handleClick = (e) => {
    editTodo(todo.id, todo.eproblem_name, todo.eproblem_tag, todo.euser_note, todo.econtestId , todo.eproblem_index);
    refClose.current.click();
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const refnoteopen = useRef(null);
  const refnoteclose = useRef(null);


  const updatetodo = (currentTodo) => {
    ref.current.click();
    setTodo({
      id: currentTodo._id,
      eproblem_name: currentTodo.problem_name,
      eproblem_tag: currentTodo.problem_tag,
      euser_note: currentTodo.user_note,
      econtestId: currentTodo.contestId,
      eproblem_index :  currentTodo.problem_index
    });
  };
  const handleclick1 = (currentTodo) => {
    refnoteopen.current.click();
    setTodo({
      id: currentTodo._id,
      eproblem_name: currentTodo.problem_name,
      eproblem_tag: currentTodo.problem_tag,
      euser_note: currentTodo.user_note,
      econtestId: currentTodo.contestId,
      eproblem_index :  currentTodo.problem_index
    });
   
    
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <h1>Your To Do List</h1>
          <button
            ref={ref}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    View and Edit your To Do List Item
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="problem_name" className="form-label">
                        Problem Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="eproblem_name"
                        name="eproblem_name"
                        aria-describedby="emailHelp"
                        required
                        value={todo.eproblem_name}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="problem_tag" className="form-label">
                        Problem Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="eproblem_tag"
                        name="eproblem_tag"
                        required
                        value={todo.eproblem_tag}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        User Note
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="euser_note"
                        name="euser_note"
                        onChange={onChange}
                        value={todo.euser_note}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refClose}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-primary"
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Problem Name</th>
                <th scope="col">Problem Tag</th>
                <th scope="col">Note</th>
                
                <th scope="col">View Problem</th>
                <th scope="col">Add to Favourites</th>
                <th scope="col">Remove from To Do List</th>
              </tr>
            </thead>
            {todos &&
              todos.map((todo) => {
                a++;

                return (
                  <>
                    <tbody>
                      <tr>
                        <td scope="row">{a}</td>
                        <td>{todo.problem_name}</td>
                        <td>{todo.problem_tag}</td>
                        <td>
                          <Link
                            type="button"
                            className="btn btn-primary mx-1"
                            onClick={() => {
                              updatetodo(todo);
                            }}
                          >
                            View
                          </Link>
                        </td>
                        <td>
                        <a
                            type="button "
                            className="btn btn-primary mx-1"
                            // onClick={showproblem(problem)}
                            href={`https://codeforces.com/problemset/problem/${todo.contestId}/${todo.problem_index}`} target="_blank"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <Link
                            type="button"
                            className="btn btn-primary mx-1"
                            to="/AddFav"
                          >
                            Add{" "}
                          </Link>
                        </td>
                        <td>
                          <Link
                            type="button"
                            className="btn btn-primary mx-1"
                            onClick={() => {
                              deleteTodo(todo._id);
                            }}
                          >
                            Remove
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
          </table>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
}
