import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({name: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, password: credentials.password})
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
  <input name="name" type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={credentials.name}  onChange={onChange}  />
</div> */}
 <div className="mb-3">
                    <label htmlFor="password" className="form-label">Username</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login