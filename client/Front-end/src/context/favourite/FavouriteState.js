import favouriteContext from "./favouriteContext";
import { useState } from "react";

const FavouriteState = (props)=>{
  const host = "http://localhost:5000"
    const favInitial =[]        
    const [favs, setfav] = useState(favInitial);

     // Get all Notes
  const getfav = async () => {
    // API Call 
    const response = await fetch(`${host}/api/fav/fetchfavlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setfav(json)
  }

    // Add a To Do List Item
    const addfav = async (problem_name,problem_tag,user_note)=>{
      const response = await fetch(`${host}/api/fav/addfav`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note})
      });
      
      const fav = await response.json();
      setfav(favs.concat(fav)) ;
    }

    // Delete a Note
    const deletefav = async (id)=>{
        // API Call
    const response = await fetch(`${host}/api/fav/deletefav/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
        console.log("Deleting the fav with id" + id);
        const newfavs = favs.filter((fav)=>{return fav._id!==id})
        setfav(newfavs)

    }
    // Edit a Note
    const editfav = async (id, problem_name,problem_tag,user_note) => {
      // API Call 
      const response = await fetch(`${host}/api/fav/updatefav/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note})
      });
      const json = await response.json();
      let newfavs = JSON.parse(JSON.stringify(favs))
  
      // Logic to edit in client
      for (let index = 0; index < newfavs.length; index++) {
        const element = newfavs[index];
        if (element._id === id) {
          newfavs[index].problem_name = problem_name;
          newfavs[index].problem_tag = problem_tag;
          newfavs[index].user_note = user_note;
          break;
        }
      }
      setfav(newfavs);
    }

    
    return (
        <favouriteContext.Provider value={{favs, deletefav,editfav , addfav , getfav}}>
            {props.children}
        </favouriteContext.Provider>
    )
}

export default FavouriteState ;