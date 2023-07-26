
import friendContext from "./friendContext";
import { useState } from "react";

const FriendState = (props)=>{
  const host = "http://localhost:5000"
    const friendInitial =[]        
    const [friends, setfriends] = useState(friendInitial);
    let checker=false;

     // Get all friends
  const getfriends = async () => { 
    const response = await fetch(`${host}/api/friends/fetchfriends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setfriends(json)
  }

    // Add a friend
    const addfriend = async (friend_name)=>{
      const response = await fetch(`${host}/api/friends/addfriend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({friend_name})
      });
      
      const friend = await response.json();
      setfriends(friends.concat(friend)) ;
      console.log("yes");
    }

    // remove a friend
    const deletefriend = async (name)=>{
    const response = await fetch(`${host}/api/friends/removefriend/${name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
        console.log("Removing the friend with id" + name);
        const newfriends = friends.filter((friend)=>{return friend.friend_name!==name})
        setfriends(newfriends)
    }

    
    // check a friend
    const checkfriend = async (friend_name)=>{
      const response = await fetch(`${host}/api/friends/iffriend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({friend_name})
      });
      
      const friend = await response.json();
    }
    
    
    return (
        <friendContext.Provider value={{friends, deletefriend, addfriend , getfriends , checkfriend , checker}}>
            {props.children}
        </friendContext.Provider>
    )
}

export default FriendState;