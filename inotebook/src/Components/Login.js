import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = (props) => {
    const [credientials, setcredientials] = useState({ email: "", password: "" })
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc. 
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZTdmZTA1MzFiOTU0N2M2Y2I3ZGEyIn0sImlhdCI6MTY4MTgzOTIzN30.cY4JIKvcAmJg6y3B8dkyzzUzTG1CDcWaOPZKfzZoGMQ"
            },
            body: JSON.stringify({ email: credientials.email, password: credientials.password }),
        });
        const json = await response.json();
        console.log(json)
        if (json.sucess) {
            //save the authtoken and  redirect
            localStorage.setItem('token', json.authtoken)
            history('/')
            props.showAlert("Logeed in  sucessfully", "success")

        } else {
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onchange = (e) => {
        // note object ke ander jo values hai vo rahe magar us ke baad ke jo values hai usku rakho ya usku override kardo
        setcredientials({ ...credientials, [e.target.name]: e.target.value })
        // [e.target.name]:e.target.value} means jo bhi uska name hai vo uski value ke bara bar hojaye
    }
    return (
        <div>
        <div className='mt-4'>
            <h3>Login to continue to iNotebook</h3>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onchange} name='password' />
            </div>

            <button type="submit" className="btn btn-primary" >Submit</button>
        </form> </div>
        </div>
    )
}

export default Login;