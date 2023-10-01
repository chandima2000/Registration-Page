import React from 'react'
import './Login.css'
import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

 function Login()  {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(res=>{
            if (res.data === "Login Successful") {
                navigate('/home');
            }else{
                alert(res.data);
            }
        })
        .catch(err=>console.log(err))
    }
  
    return (

        <div className="login template d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded form-container">
                <h2 className="text-center text-lg-start text-uppercase fs-1">Log In</h2>
        
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type="email"
                            className="form-control rounded-5"
                            name="email"
                            placeholder="Enter email" 
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            className="form-control rounded-5"
                            name='password'
                            placeholder="Enter password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Log In
                        </button>
                    </div>

                    <p className='text-end mt-2'> Don't have an account?<Link to="/">Register</Link></p>
            
                </form>
            </div>
        </div>
    )
  }


export default Login;