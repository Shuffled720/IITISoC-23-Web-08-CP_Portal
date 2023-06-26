import React, { useContext, useEffect, useRef, useState } from 'react'
import FavContext from "../context/favourite/favouriteContext"
import { Link } from "react-router-dom";
import IsLogin from '../IsLogin';
import { useNavigate } from 'react-router-dom';
// import ShowUserNote from './ShowUserNote';


export default function Favourites() {
  const navigate = useNavigate();
    // <IsLogin/>
  const context = useContext(FavContext);
    const {favs, deletefav,editfav , addfav , getfav} = context;
    const [fav, setFav] = useState({id:"" ,eproblem_name: "", eproblem_tag: "", euser_note: "No notes added"})
    let a=0;
    useEffect(() => {
      if((localStorage.getItem('token')))
    {
      getfav()
    }
    else
    {
      navigate('/login');
    }
  }, [])
  const handleClick = (e)=>{
    editfav(fav.id , fav.eproblem_name, fav.eproblem_tag , fav.euser_note);
    refClose.current.click();
}

const onChange = (e)=>{
  setFav({...fav, [e.target.name]: e.target.value})
}

  const ref = useRef(null)
  const refClose = useRef(null);
  const updatefav = (currentFav) => {
    ref.current.click();
    setFav({id: currentFav._id ,eproblem_name: currentFav.problem_name, eproblem_tag: currentFav.problem_tag, euser_note:currentFav.user_note})
}

  return (
    <>
   {localStorage.getItem("token")?<>
    <div className='container'>
      <h1>Your Favourites List</h1>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Favourites List Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="problem_name" className="form-label">Problem Name</label>
                    <input type="text" className="form-control" id="eproblem_name" name="eproblem_name" aria-describedby="emailHelp"  required value={fav.eproblem_name}/> 
                </div>
                <div className="mb-3">
                    <label htmlFor="problem_tag" className="form-label">Problem Tag</label>
                    <input type="text" className="form-control" id="eproblem_tag" name="eproblem_tag"  required value={fav.eproblem_tag}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="user_note" className="form-label">User Note</label>
                    <input type="text" className="form-control" id="euser_note" name="euser_note" onChange={onChange} value={fav.euser_note}/>
                </div>
            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
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
      <th scope="col">Update Note</th>
      <th scope="col">Add to To Do List</th>
      <th scope="col">Remove from Favourites</th>
    </tr>
  </thead>
      {favs && favs.map((fav )=>{
        a++;
        
        return(<><tbody>
                    <tr >
                      <td scope="row">{a}</td> 
                      <td>{fav.problem_name}</td>
                      <td>{fav.problem_tag}</td>
                      <td>{fav.user_note}</td>

                      {/* <td><Link type="button" className="btn btn-primary mx-1" onClick={()=>{<ShowUserNote />}}>View </Link></td> */}
                      <td><Link type="button" className="btn btn-primary mx-1" onClick={()=>{updatefav(fav)}}>Update </Link></td>
                      <td><Link type="button" className="btn btn-primary mx-1" to="/AddToDo">Add </Link></td>
                      <td><Link type="button" className="btn btn-primary mx-1" onClick={()=>{deletefav(fav._id)}}>Remove</Link></td>
                    </tr>
                  </tbody>
                  </>
                  ) 
            })}
            </table>
    </div>
    </>:navigate('/login')}

    </>
  )
}
