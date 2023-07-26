import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate , useParams } from "react-router-dom";
import userContext from "../context/user/userContext";
import friendContext from "../context/friend/friendContext";

export default function Users(props) {
    const navigate = useNavigate();
    const params = useParams();
    const context = useContext(userContext);
    const { users, getUser, editUser , otherusers , getUserInfo , setOtherUser} = context;
    const context1 = useContext(friendContext);
    const { addfriend , deletefriend} = context1;
    const userInitial =[]        
    const [cfid, setCFID] = useState();
    const [name, setName] = useState();
    const [user, setUser] = useState(userInitial);
    const host = "http://localhost:5000"
    const fetchcfid = async () => {
        // ${users.codeforces_user}
        const url = `https://codeforces.com/api/user.info?handles=${otherusers.codeforces_user}`;
        let data = await fetch(url);
        let parsedData = await data?.json();
        if(parsedData.result){
          setCFID(parsedData.result[0]);
        }
        // console.log(cfid?.rating);
      };
      const fetchuserinfo = async (username) => {
        console.log("test 1")
        getUserInfo(username);
        // console.log(friendid1);
      };
      const addfriend1 = async () => {
        addfriend(username);
        alert("Friend Added")
        setId("1");
      };

      const deletefriend1= async () => {
        deletefriend(username);
        alert("Friend Removed");
        setId("2");
      };

      const username= params.username;
      console.log(username+" test");
      const [id, setId] = useState(params.friendid);
      // console.log(id + " this is retrieved");
    useEffect(() => {
        console.log("1234");
        if (localStorage.getItem("token")) {
           console.log("test 123");
            fetchuserinfo(username)  
        } else {
          navigate("/login");
        }
      }, []);

    
      const handleOnChange3=(event)=>{
        setName(event.target.value);
      }

      

    
  return (
   <>    
            {username!=""?<>
            <div className="my-3">
            CodeCrafter Username : {otherusers.name}
            <br />
          </div>

          <div className="my-3">
            Email :{otherusers.email}
            <br />
          </div>

          <div className="my-3">
            CodeForces Username :{" "}
            {otherusers.codeforces_user ? otherusers.codeforces_user : "Not Added"}
            <br />
            CodeForces rating :
            {otherusers.codeforces_user ? (
            <>
           
            {cfid?cfid.rating:"Username not Found"}
            </>) : "Username Not Added"}
          </div>

          <div className="my-3">
            CodeChef Username :{" "}
            {otherusers.codechef_user ? otherusers.codechef_user : "Not Added"}
            <br />
          </div>

          <div className="my-3">
            LeetCode Username :{" "}
            {otherusers.leetcode_user ? otherusers.leetcode_user : "Not Added"}
            <br />
          </div>

          <div className="my-3">
            AtCoder Username :{" "}
            {otherusers.atcoder_user ? otherusers.atcoder_user : "Not Added"}
          </div>

          <div className="my-3">
            HackerRank Username :{" "}
            {otherusers.hackerrank_user ? otherusers.hackerrank_user : "Not Added"}
            <br />
          </div>
          {id==="1"?<>
            <button type="button" class="btn btn-primary my-2 " onClick={() => {
              deletefriend1();
            }}>Remove Friend</button>
            <br/>
          </> 
            :<>
          <button type="button" class="btn btn-primary " onClick={() => {
              addfriend1();
            }}>Add Friend</button>
            </>}
   
            </>:<><br/><br/>No username searched</>}
    
   </>
  )
}
