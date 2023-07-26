import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import friendContext from "../context/friend/friendContext";

export default function Friends() {
  const navigate = useNavigate();
  let a = 0;
  const context = useContext(userContext);
  const {
    users,
    getUser,
    editUser,
    ifuser,
    otherusers,
    getUserInfo,
    setOtherUser,
  } = context;
  const context1 = useContext(friendContext);
  const { friends, getfriends, addfriend, checker, checkfriend, deletefriend } =
    context1;
  const userInitial = [];
  const [cfid, setCFID] = useState();
  const [name, setName] = useState();
  const [unique, setunique] = useState();
  const [friendid, setId] = useState("2");
  const [btn, setbtn] = useState("0");
  const [user, setUser] = useState(userInitial);
  const host = "http://localhost:5000";

  const fetchcfid = async () => {
    // ${users.codeforces_user}
    const url = `https://codeforces.com/api/user.info?handles=${otherusers.codeforces_user}`;
    let data = await fetch(url);
    let parsedData = await data?.json();
    if (parsedData.result) {
      setCFID(parsedData.result[0]);
    }
    console.log(cfid?.rating);
  };
  console.log(btn + "testy");
  let checker1;
  const addfriend1 = async (name) => {
    addfriend(name);
  };

  const addfriend2 = async (name) => {
    setunique(name);
    console.log(unique);
  };

  const fetchuserinfo = async (name) => {
    getUserInfo(name);
    const friend_name = name;
    const response = await fetch(`${host}/api/friends/iffriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ friend_name }),
    });

    let checker1 = await response.json();
    if (checker1) {
      setId(1);
    } else {
      setId(2);
    }
    console.log(friendid + "yooo");
    console.log(ifuser);
    setbtn("1");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getfriends();
      fetchuserinfo(name);
    } else {
      navigate("/login");
    }
  }, []);

  const handleOnChange3 = (event) => {
    setbtn("0");
    setName(event.target.value);
    console.log("below");
    console.log(name);
  };
  return (
    <>
      Your can search other Users of CodeCrafter from here
      <br />
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          class="form-control"
          value={name}
          onChange={handleOnChange3}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <button
        type="button"
        class="btn btn-primary "
        onClick={() => {
          fetchuserinfo(name);
        }}
      >
        Search
      </button>
      {btn === "1" ? (
        <>
          {ifuser ? (
            <>
              <br />
              <br />
              <h6>User Found!</h6>
              <button
                type="button"
                class="btn btn-primary "
                onClick={() => {
                  
                  navigate(`/Users/${name}/${friendid}`);
                }}
              >
                View Profile
              </button>
            </>
          ) : (
            <>
              <br />
              <br />
              <h6>User not Found!</h6>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      <br />
      <br />
      <h4> Your Friends</h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Friend Username</th>
            {/* <th scope="col">View Profile</th> */}
            <th scope="col">Remove Friend</th>
          </tr>
        </thead>

        {friends &&
          friends.map((friend) => {
            return (
              <>
              
                <tbody>
                  <tr>
                    <td>{friend.friend_name}</td>
                    {/* <td>
                      {" "}
                      <button
                        type="button"
                        class="btn btn-primary my-2"
                        onClick={() => {
                          console.log(friend.friend_name);
                          console.log("above1");
                          addfriend2(friend.friend_name);
                          // setunique(friend.friend_name);
                          // setName1(friend.friend_name);
                          console.log(unique);
                          navigate(`/Users/${unique}/${1}`);
                        }}
                      >
                        View Profile
                      </button>
                    </td> */}
                    <td>
                      {" "}
                      <button
                        type="button"
                        class="btn btn-primary my-2 "
                        onClick={() => {
                          deletefriend(friend.friend_name);
                        }}
                      >
                        Remove Friend
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
}
