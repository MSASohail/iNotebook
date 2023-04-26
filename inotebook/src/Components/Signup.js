import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = (props) => {
    const [credientials, setcredientials] = useState({name:"",email:"",password:"",cpassword:""})
    let history= useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();    
        const{name,email,password}=credientials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc. 
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZTdmZTA1MzFiOTU0N2M2Y2I3ZGEyIn0sImlhdCI6MTY4MTgzOTIzN30.cY4JIKvcAmJg6y3B8dkyzzUzTG1CDcWaOPZKfzZoGMQ"
            },
            body: JSON.stringify({ name,email,password}), 
        });
        const json = await response.json();
        console.log(json)
        if (json.sucess) {
            //save and  redirect
            localStorage.setItem('token',json.authtoken)
            history('/')
            props.showAlert("Account created sucessfully","success")

        } else {
            props.showAlert("Invalid credientials","danger")
        }
    }
    const onchange = (e) => {
        // note object ke ander jo values hai vo rahe magar us ke baad ke jo values hai usku rakho ya usku override kardo
        setcredientials({ ...credientials, [e.target.name]: e.target.value })
        // [e.target.name]:e.target.value} means jo bhi uska name hai vo uski value ke bara bar hojaye
    }
    return (
        <div className='my-4'>
        <h3>Signup to create an account  to acess iNotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onchange} />                  
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={5} required />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup