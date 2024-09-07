import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../layout/AuthProvider";
import moment from "moment/moment";
function EditsProfile(){
    const {id} = useAuth();
    const [data,setData] = useState({
        name :'',
        email:'',
        image: '',
        password :'',
        comfirm:'',
        id :id
    });
    const [initial,setInitial] = useState({
        name :'',
        email:'',
        image: '',
        date :'',
        password :'',
        comfirm:''
    });
    useEffect(()=>{
        axios.get(`http://localhost:8000/user/${id}`)
        .then(res=>{
            setInitial(res.data);
            setData(res.data);
        })
        .catch(err=>console.log(err))
    },[])
    const nav = useNavigate();
    const EditProfile=(e)=>{
        e.preventDefault();
        const {name,email,image,password,comfirm} = data;
        const requestData = {
            name : name.trim()==='' ? initial.name : name,
            email : email.trim()==='' ? initial.email : email,
            image : image.trim()==='' ? initial.image : image,
            password :password.trim()==='' ? initial.password : password,
            comfirm : comfirm.trim()==='' ? initial.comfirm : comfirm,
            date : initial.date,
            id : id
        }
        if(name.trim()===''){
            delete requestData.name;
        }
        if(email.trim()===''){
            delete requestData.email;
        }
        if(image.trim()===''){
            delete requestData.image;
        }
        if(password.trim()===''){
            delete requestData.password;
        }
        if(comfirm.trim()===''){
            delete requestData.comfirm;
        }
        axios.put(`http://localhost:8000/user/${id}`,requestData)
        .then(res=>{
            alert("Edits Successfull!")
            nav('/profile');
        })
        .catch(err=>{
            alert("Edits Fails");
            console.log(err);
        })
    }
    return <div className="editProfile">
    <form onSubmit={EditProfile}>
    <h2>Edits Profile...</h2>
    <label>Name :</label><br />
    <input type="text" name="name" placeholder="Enter Name"
     onChange={(e)=>setData({...data,name:e.target.value})}/><br />
    <label>email :</label><br />
    <input type="email" name="email"placeholder="Enter Email"
     onChange={(e)=>setData({...data,email:e.target.value})}/><br />
    <label>Image Url :</label><br/>
    <input type="text" placeholder="Enter Image"
    onChange={(e)=>setData({...data,image:e.target.value})} /><br/>
    <button type="submit">Edits</button>
    </form>
    </div>
}
export default EditsProfile;