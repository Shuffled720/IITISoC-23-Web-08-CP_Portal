
import favouriteContext from "./favouriteContext";
import { useState } from "react";

const FavouriteState = (props)=>{
  const host = "http://localhost:5000"
    const favInitial =[]        
    const [favs, setfav] = useState(favInitial);

     // Get all favourite list items
  const getfav = async () => { 
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

    // Add a favourite List Item
    const addfav = async (problem_name,problem_tag,user_note,contestId, problem_index)=>{
      const response = await fetch(`${host}/api/fav/addfav`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note,contestId, problem_index})
      });
      
      const fav = await response.json();
      setfav(favs.concat(fav)) ;
    }

    // Delete a favourite list item
    const deletefav = async (id)=>{
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
    // Edit a favourite list item
    const editfav = async (id, problem_name,problem_tag,user_note,contestId, problem_index) => {
      const response = await fetch(`${host}/api/fav/updatefav/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({problem_name,problem_tag,user_note,contestId, problem_index})
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
          newfavs[index].contestId = contestId;
          newfavs[index].problem_index = problem_index;
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