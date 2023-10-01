import React from 'react'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup(){

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate =useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name,email,password},{
                headers :{'Content-Type' : 'application/json'}}
            )
        .then(res=>{
            navigate('/login');
        })
        .catch((err) => {
            if(err.response){
                setError(err.response.data.error);
            }
            else{
                console.error('Network error : ',err.message);
                setError('An error occurred. Please try again later.');
            }
        })
    }

    return(
        <>

            <div className="login template d-flex justify-content-center align-items-center  bg-primary vh-100">
                <div className="bg-white p-3 rounded form-container">
                    <h2 className="text-center text-lg-start text-uppercase fs-1 ">Sign in</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name">Name</label>
                                    <br/>
                                    <input type="text" 
                                            id='name'
                                            autoComplete='off'
                                            placeholder="Enter Name" 
                                            name="name"
                                            className="form-control rounded-5" 
                                            onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email </label>
                                    <br/>
                                    <input type="email" 
                                            id = "email"
                                            autoComplete='off'
                                            placeholder="Enter Email" 
                                            name="email" 
                                            className="form-control rounded-5"
                                            onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password">Password </label>
                                    <br/>
                                    <input type="password" 
                                            id='password'
                                            autoComplete='off' 
                                            placeholder="Enter Password" 
                                            name="password" 
                                            className="form-control rounded-5"
                                            onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="d-grid">

                                        <button type="submit" className="btn btn-primary ">
                                            Register
                                        </button>

                                </div>

                                <p className='text-end mt-2'> Already have an account?<Link to="/login">Login</Link></p>
                                
                            </form>
                </div>
            </div>
        </>
    )
}

export default Signup;