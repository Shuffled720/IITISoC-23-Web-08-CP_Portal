import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import problemContext from "../context/problems/problemContext";
import ToDoContext from "../context/todo/todoContext"
import FavContext from "../context/favourite/favouriteContext"
import Spinner from "./Spinner";

export default function Problems() {
  const navigate = useNavigate();
  const context = useContext(problemContext);
  const { problems ,getProblem} = context;
  const context1 = useContext(ToDoContext);
  const { addTodo} = context1;
  const context2 = useContext(FavContext);
    const {addfav} = context2;
    const [loading, setLoading] = useState(false)
  
  const [tag, setTag] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      
    } else {
      navigate("/login");
    }
  }, []);
  const [diff1, setDiff1] = useState("0");
  const [diff2, setDiff2] = useState("4000");
  
const handleOnChange3=(event)=>{
  setTag(event.target.value);
}
  const handleOnChange1 = (event) => {
    setDiff1(event.target.value);
  };
  const handleOnChange2 = (event) => {
    setDiff2(event.target.value);
  };
  const fetchproblems = async () => {
    setLoading(true)
    getProblem(tag);
    setLoading(false)
  };
  // const fetchproblems1 = async (platform) => {
  //   setLoading(true)
  //   getProblem(platform);
  //   setLoading(false)
  // };

  const ref = useRef(null);
  const refClose = useRef(null);
 
 
  const [todo, settodo] = useState({problem_name: "", problem_tag: "", user_notes: "No notes added", contestId:"",problem_index:"" , flag:""})

  const handleClick = (e)=>{
     if(todo.flag==="1")
     {
       addTodo(todo.problem_name,todo.problem_tag,todo.user_notes , todo.contestId , todo.problem_index);
     }
     else
     {
      addfav(todo.problem_name,todo.problem_tag,todo.user_notes , todo.contestId , todo.problem_index);
     }
     alert("Problem Added")
      refClose.current.click();
  }

  const onChange = (e)=>{
      settodo({...todo, [e.target.name]: e.target.value})
  }

  const addtodo1 = (currentProblem , flag) => {
    ref.current.click();
    settodo({
     problem_name : currentProblem.name,
     problem_tag : currentProblem.contestId + currentProblem.index,
     user_notes : "No Notes Added",
     problem_index : currentProblem.index,
     contestId: currentProblem.contestId,
     flag : flag
    });
  };
 let a=0;
  
  return (
    <>
      {localStorage.getItem("token") ? 
        <div>
           
          <div className="my-3">
            <h2>Problems</h2>
          </div>

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
                    Problem details to be added
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
                        value={todo.problem_name}
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
                        value={todo.problem_tag}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        User Note
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="user_notes"
                        name="user_notes"
                        onChange={onChange}
                        value={todo.user_notes}
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
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          Initial Difficulty
          <input
            class="form-control my-1"
            value={diff1}
            onChange={handleOnChange1}
            type="text"
            placeholder="Initial Difficulty"
            aria-label="default input example"
          ></input>
          <br/>
          
          Final Difficulty
          <input
            class="form-control my-1"
            value={diff2}
            onChange={handleOnChange2}
            type="text"
            placeholder=" Final Difficulty"
            aria-label="default input example"
          ></input>
          <br/>
          Question Tag on CodeForces:

          <select class="form-select" aria-label="Default select example" value={tag} onChange={handleOnChange3}> 
                        <option value=""></option>
                        combine-tags-by-or
                        <option value="combine-tags-by-or" title="*combine tags by OR">*combine tags by OR</option>
                            <option value="2-sat" title="2-satisfiability">2-sat</option>
                            <option value="binary%20search" title="Binary search">binary search</option>
                            <option value="bitmasks" title="Bitmasks">bitmasks</option>
                            <option value="brute%20force" title="Brute force">brute force</option>
                            <option value="chinese%20remainder%20theorem" title="Сhinese remainder theorem">chinese remainder theorem</option>
                            <option value="combinatorics" title="Combinatorics">combinatorics</option>
                            <option value="constructive%20algorithms" title="Constructive algorithms">constructive algorithms</option>
                            <option value="data%20structures" title="Heaps, binary search trees, segment trees, hash tables, etc">data structures</option>
                            <option value="dfs%20and%20similar" title="Dfs and similar">dfs and similar</option>
                            <option value="divide%20and%20conquer" title="Divide and Conquer">divide and conquer</option>
                            <option value="dp" title="Dynamic programming">dp</option>
                            <option value="dsu" title="Disjoint set union">dsu</option>
                            <option value="expression%20parsing" title="Parsing expression grammar">expression parsing</option>
                            <option value="fft" title="Fast Fourier transform">fft</option>
                            <option value="flows" title="Graph network flows">flows</option>
                            <option value="games" title="Games, Sprague–Grundy theorem">games</option>
                            <option value="geometry" title="Geometry, computational geometry">geometry</option>
                            <option value="graph%20matchings" title="Graph matchings, König's theorem, vertex cover of bipartite graph">graph matchings</option>
                            <option value="graphs" title="Graphs">graphs</option>
                            <option value="greedy" title="Greedy algorithms">greedy</option>
                            <option value="hashing" title="Hashing, hashtables">hashing</option>
                            <option value="implementation" title="Implementation problems, programming technics, simulation">implementation</option>
                            <option value="interactive" title="Interactive problem">interactive</option>
                            <option value="math" title="Mathematics including integration, differential equations, etc">math</option>
                            <option value="matrices" title="Matrix multiplication, determinant, Cramer's rule, systems of linear equations">matrices</option>
                            <option value="meet-in-the-middle" title="Meet-in-the-middle">meet-in-the-middle</option>
                            <option value="number%20theory" title="Number theory: Euler function, GCD, divisibility, etc">number theory</option>
                            <option value="probabilities" title="Probabilities, expected values, statistics, random variables, etc">probabilities</option>
                            <option value="schedules" title="Scheduling Algorithms">schedules</option>
                            <option value="shortest%20paths" title="Shortest paths on weighted and unweighted graphs">shortest paths</option>
                            <option value="sortings" title="Sortings, orderings">sortings</option>
                            <option value="string%20suffix structures" title="Suffix arrays, suffix trees, suffix automatas, etc">string suffix structures</option>
                            <option value="strings" title="Prefix- and Z-functions, suffix structures, Knuth–Morris–Pratt algorithm, etc">strings</option>
                            <option value="ternary%20search" title="Ternary search">ternary search</option>
                            <option value="trees" title="Trees">trees</option>
                            <option value="two%20pointers" title="Two pointers">two pointers</option>
                  
    
  </select> 
          <Link type="button " className="btn btn-primary mx-1 my-3" onClick={fetchproblems}>Search on CodeForces</Link>
          {/* <Link type="button " className="btn btn-primary mx-1 my-3" onClick={fetchproblems1("codechef")}>Search on CodeChef</Link>
          <Link type="button " className="btn btn-primary mx-1 my-3" onClick={fetchproblems1("atcoder")}>Search on AtCoder</Link>
          <Link type="button " className="btn btn-primary mx-1 my-3" onClick={fetchproblems1("leetcode")}>Search on LeetCode</Link>
          <Link type="button " className="btn btn-primary mx-1 my-3" onClick={fetchproblems1("hackerrank")}>Search on HackerRank</Link> */}
          {loading && <Spinner/>}
          <br/>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Problem Name</th>
      <th scope="col">Problem Tag</th>
      <th scope="col">Problem Rating</th>
      <th scope="col">View Problem</th>
      <th scope="col">Add to To Do List</th>
      <th scope="col">Add to Favourites</th>
    </tr>
  </thead>
    {problems&&problems.map((problem,key)=>(
      <>
      
      {problem.rating>=diff1&&problem.rating<=diff2?
    <tbody>
      <tr>
        <td>{problem.name}</td>
        <td>{problem.contestId}{problem.index}</td>
        <td>{problem.rating}</td>
        <td><a type="button " className="btn btn-primary " href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target="_blank">View Problem </a></td>
        <td><Link type="button" className="btn btn-primary " onClick={() => {addtodo1(problem,"1");}}> Add to To Do List</Link></td>
        <td><Link type="button" className="btn btn-primary " onClick={() => { addtodo1(problem,"2");}}>Add to Favourites List</Link></td>
      </tr>
      </tbody>
    :<></>}
      </>
          )
          )}
</table>
          
        </div>
      
        : navigate("/login")
      } 
    </>
  );
}
