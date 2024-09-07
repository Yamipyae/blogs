import axios from "axios";
import moment from "moment/moment";
import React, { useState } from "react";
import { useNavigate } from "react-router";
function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [comfirm,setComfirm] = useState('');
    const [image,setImage] = useState('');
    const [phone,setPhone] =useState('');
    const date = moment().format("MMM Do YYYY");
    const nav = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const obj = {name,image,email,password,comfirm,phone,date};
        if(password !== comfirm){
            alert("password is not correct!");
            return;
        }
        fetch("http://localhost:8000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(obj)
        }).then((res)=>res.json())
        .then((res)=>{
            localStorage.setItem('user', JSON.stringify({
                 name: res.name,
                 email: res.email,
                 image: res.image,
                 phone :res.phone,
                 date :res.date
                }));
            nav('/login');
        }).catch((err)=>{
            console.log(err)
        });
    }
    return <div className="Register">
    <form onSubmit={handleSubmit}>
    <h2>Register...</h2>
    <label>Name :</label><br />
    <input type="text" required name="name" placeholder="Please Enter Your Name"
    value={name} onChange={(e)=>setName(e.target.value)}/><br />
    <label>email :</label><br />
    <input type="email" required name="email" placeholder="Enter Your Email"
    value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
    <label>passowrd :</label><br />
    <input type="password" required name="password" placeholder="Enter Password"
    value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
    <label>comfirm passowrd :</label><br />
    <input type="password" required name="confirm_password" placeholder="Enter Comfirm Password"
    value={comfirm} onChange={(e)=>setComfirm(e.target.value)}/><br />
    <label>Phone No :</label><br/>
    <input type="text" value={phone} required placeholder="Enter Phone Number"
    onChange={(e)=>setPhone(e.target.value)} /><br/>
    <label>Image Url :</label><br/>
    <input type="text" value={image} required placeholder="Enter Image URL"
    onChange={(e)=>setImage(e.target.value)} /><br/>
    <button type="submit">Register</button>
    </form>
    </div>
}
export default Register;