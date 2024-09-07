import React, { useState } from "react";
import { useAuth } from "../layout/AuthProvider";
import { useNavigate } from "react-router";
import db from "../jsonData/data.json"
import { Link } from "react-router-dom";
function Login(){
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const {setName,setemail,setImage,setId,setPhone,setDate} = useAuth();
    const nav = useNavigate();
    const handleSubmit =(e)=>{
        e.preventDefault();
        const foundUser = db.user.find((user)=>user.email===email && user.password===password);
        const EmailInc = db.user.find((user)=>user.email!==email && user.password===password);
        const PassInc = db.user.find((user)=>user.email===email && user.password!==password);
         console.log(db.user);
        if(valid()){
            if(foundUser){
                alert("Success!");
                        localStorage.setItem('user', JSON.stringify({
                             name: foundUser.name,
                             email: foundUser.email,
                              image: foundUser.image ,
                              phone :foundUser.phone,
                              id : foundUser.id,
                              date :foundUser.date
                            }));
                        setId(foundUser.id);
                        setName(foundUser.name);
                        setemail(foundUser.email);
                        setImage(foundUser.image);
                        setPhone(foundUser.phone);
                        setDate(foundUser.date)
                        console.log("To Profilr");
                        nav('/profile')
            }
            else if(EmailInc) {
                alert("Email is not correct!!");
            }
            else if(PassInc){
                alert("Password is not correct!!");
            }
            else {
                alert("Try Again!!");
            }

            
        }
    }
    const valid = ()=>{
        let result = true;
        if(email==='' || email===null){
            result=false;
            alert("please Enter User Email!");
        }else if(password==='' || setPassword===null){
            result=false;
            alert("please Enter Password !")
        }
        return result;
    }
    
    return <div className="Login">
   
    <form onSubmit={handleSubmit}>
    <h2>Welcome Login...</h2>
    <label>email :</label><br/>
    <input type="email" name="email" value={email} placeholder="Enter Email"
    required
    onChange={(e)=>setEmail(e.target.value)} /><br/>
    <label>passowrd :</label> <br/>
    <input type="password" name="password" requiredvalue={password} placeholder="Enter Password"
    onChange={(e)=>setPassword(e.target.value)}/><br/>
    
    <button type="submit">Login</button><br/>
    <Link to='/register'>To Register</Link>
    </form>
    
    </div>
}
export default Login;