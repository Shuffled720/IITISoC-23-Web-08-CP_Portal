import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";

export default function Profile() {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { users, getUser, editUser } = context;
  const [user, setuser] = useState({
    id: "",
    ename: "",
    eemail: "",
    ecodeforces_user: "",
    ecodechef_user: "",
    eatcoder_user: "",
    eleetcode_user: "",
    ehackerrank_user: "",
  });
  const [cfid, setCFID] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
  },[]);
  
  const fetchcfid = async () => {
    // ${users.codeforces_user}
    const url = `https://codeforces.com/api/user.info?handles=${users.codeforces_user}`;
    let data = await fetch(url);
    let parsedData = await data?.json();
    if(parsedData.result){
      setCFID(parsedData.result[0]);
    }
    console.log(cfid?.rating);
  };
  
  fetchcfid();
  const handleClick = (e) => {
    editUser(
      user.id,
      user.ename,
      user.eemail,
      user.ecodeforces_user,
      user.ecodechef_user,
      user.eatcoder_user,
      user.eleetcode_user,
      user.ehackerrank_user
    );
    alert("Profile Updated")
    refClose.current.click();
  };

  const onChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateuser = (currentUser) => {
    ref.current.click();
    setuser({
      id: currentUser._id,
      ename: currentUser.name,
      eemail: currentUser.email,
      ecodeforces_user: currentUser.codeforces_user,
      ecodechef_user: currentUser.codechef_user,
      eatcoder_user: currentUser.atcoder_user,
      eleetcode_user: currentUser.leetcode_user,
      ehackerrank_user: currentUser.hackerrank_user,
    });
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <h1>Profile</h1>
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
                    Edit Profile
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
                      <label htmlFor="user_note" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ename"
                        name="ename"
                        onChange={onChange}
                        value={user.ename}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="eemail"
                        name="eemail"
                        onChange={onChange}
                        value={user.eemail}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        CodeForces Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ecodeforces_user"
                        name="ecodeforces_user"
                        onChange={onChange}
                        value={user.ecodeforces_user}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        CodeChef Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ecodechef_user"
                        name="ecodechef_user"
                        onChange={onChange}
                        value={user.ecodechef_user}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        LeetCode Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="eleetcode_user"
                        name="eleetcode_user"
                        onChange={onChange}
                        value={user.eleetcode_user}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        AtCoder Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="eatcoder_user"
                        name="eatcoder_user"
                        onChange={onChange}
                        value={user.eatcoder_user}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="user_note" className="form-label">
                        HackerRank Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ehackerrank_user"
                        name="ehackerrank_user"
                        onChange={onChange}
                        value={user.ehackerrank_user}
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
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="my-3">
            CodeCrafter Username : {users.name}
            <br />
          </div>

          <div className="my-3">
            Email :{users.email}
            <br />
          </div>

          <div className="my-3">
            CodeForces Username :{" "}
            {users.codeforces_user ? users.codeforces_user : "Not Added"}
            <br />
            CodeForces rating :
            {users.codeforces_user ? (
            <>
           
            {cfid?cfid.rating:"Username not Found"}
            </>) : "Username Not Added"}
          </div>

          <div className="my-3">
            CodeChef Username :{" "}
            {users.codechef_user ? users.codechef_user : "Not Added"}
            <br />
          </div>

          <div className="my-3">
            LeetCode Username :{" "}
            {users.leetcode_user ? users.leetcode_user : "Not Added"}
            <br />
          </div>

          <div className="my-3">
            AtCoder Username :{" "}
            {users.atcoder_user ? users.atcoder_user : "Not Added"}
          </div>

          <div className="my-3">
            HackerRank Username :{" "}
            {users.hackerrank_user ? users.hackerrank_user : "Not Added"}
            <br />
          </div>
          <button
            class="btn btn-primary"
            type="submit"
            onClick={() => {
              updateuser(users);
            }}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
}
