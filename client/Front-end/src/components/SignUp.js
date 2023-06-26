import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name: "", password: "" , email:""}) 
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password} = credentials;
        const response = await fetch("http://localhost:5000/api/user/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name , email , password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            
            localStorage.setItem('token', json.authtoken); 
            navigate('/');
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        // <h1>login</h1>
        <div>
            <form  onSubmit={handleSubmit}>
                {/* <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input name="name" type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"  onChange={onChange}  />
                  </div> */}
                  <div class="form-floating mb-3">
                    <input name="name" type="text" class="form-control" id="floatingInput" placeholder="codecrafter"  onChange={onChange}/>
                    <label for="floatingInput">User Name</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  onChange={onChange}/>
                    <label for="floatingInput">Email address</label>
                  </div>
                {/* <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  onChange={onChange} minLength={5} required name="password" id="password" />
                </div> */}
                <div class="form-floating mb-3">
                    <input name="password" type="password" class="form-control" id="floatingInput" placeholder="secure password"  onChange={onChange}/>
                    <label for="floatingInput">Password</label>
                  </div>
                <div className='my-1'>Note: Your password must be atleast 6 characters long</div>
                <br/>

                <button type="submit" className="btn btn-primary my-1">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
