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
        <div>
            <h1>Sign Up</h1>
            <form  onSubmit={handleSubmit}>
                  <div class="form-floating mb-3">
                    <input name="name" type="text" class="form-control" id="floatingInput" placeholder="codecrafter"  onChange={onChange}/>
                    <label for="floatingInput">User Name</label>
                  </div>
                  <div className='my-1'>Note: Your Username must be atleast 5 characters long</div>
                  <div class="form-floating mb-3">
                    <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  onChange={onChange}/>
                    <label for="floatingInput">Email address</label>
                  </div>
                <div class="form-floating mb-3">
                    <input name="password" type="password" class="form-control" id="floatingInput" placeholder="secure password"  onChange={onChange}/>
                    <label for="floatingInput">Password</label>
                  </div>
                <div className='my-1'>Note: Your password must be atleast 7 characters long</div>
                <br/>

                <button type="submit" className="btn btn-primary my-1">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
