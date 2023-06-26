import React, {useContext, useState} from 'react'
import FavContext from "../context/favourite/favouriteContext"
import ProblemNavbar from './ProblemNavbar';

export default function AddFav ()  {
    const context = useContext(FavContext);
    const {addfav} = context;

    const [fav, setFav] = useState({problem_name: "", problem_tag: "", user_notes: "No notes added"})

    const handleClick = (e)=>{
        e.preventDefault();
        addfav(fav.problem_name,fav.problem_tag,fav.user_notes);
    }

    const onChange = (e)=>{
        setFav({...fav, [e.target.name]: e.target.value})
    }
    return (
        <>
        <ProblemNavbar/>
        <div className="container my-3">
            <h2>Add to Favourites</h2>
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

