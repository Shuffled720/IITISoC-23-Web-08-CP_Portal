import UserContext from "./userContext";
import { useState } from "react";
import React from 'react'

export default function UserState(props) {
    const host = "http://localhost:5000"
    const userInitial =[]        
    const [users, setUser] = useState(userInitial);
    const [otherusers, setOtherUser] = useState(userInitial);

    //get user info   
  const getUser = async () => {
    const response = await fetch(`${host}/api/user/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setUser(json)
  }

   // update user info
   const editUser = async (id, name,email,codeforces_user ,codechef_user,atcoder_user,leetcode_user,hackerrank_user) => {
    const response = await fetch(`${host}/api/user/addusername/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name,email,codeforces_user ,codechef_user,atcoder_user,leetcode_user,hackerrank_user})
    });
    const json = await response.json();
    let newUsers = JSON.parse(JSON.stringify(users))

    // Logic to edit in client
    for (let index = 0; index < newUsers.length; index++) {
      const element = newUsers[index];
      if (element._id === id) {
        newUsers[index].name = name;
        newUsers[index].email = email;
        newUsers[index].codeforces_user = codeforces_user;
        newUsers[index].codechef_user = codechef_user;
        newUsers[index].atcoder_user = atcoder_user;
        newUsers[index].leetcode_user = leetcode_user;
        newUsers[index].hackerrank_user = hackerrank_user;
        break;
      }
    }
    setUser(newUsers);
  }
  const [ifuser, setifuser] = useState();
      //get user info   
      const getUserInfo = async (name) => {
        console.log(name+" 123 this is test")
        const response = await fetch(`${host}/api/user/getuserinfo/${name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
        console.log(json)
        // console.log("above");   
        setOtherUser(json.user);
        if(json.success)
        {
          setifuser(true);
        }
        else
        {
          setifuser(false);
        }
      }
  return (
    <UserContext.Provider value={{users, otherusers, getUser, editUser , getUserInfo , setOtherUser , ifuser}}>
    {props.children}
    </UserContext.Provider>
  )
}
