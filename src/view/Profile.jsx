import React, { useEffect, useState } from "react";
import { useAuth } from "../layout/AuthProvider";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
function Profile(){
    const {name,logout,email,image,id,phone,date} = useAuth();
    const [posts,setPost] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        if (!name || !email || !image || !phone || !date) {
            nav('/login');
        }
    }, [name, email, image,phone,date, nav]);
    useEffect(()=>{
        axios.get(`http://localhost:8000/posts?userId=${id}&_sort=id&_order=desc`)
        .then(res=>{
            console.log(res.data);
            setPost(res.data || [])})
        .catch(err=>console.log(err))
    },[id])
    const createBtn = ()=>{
        nav('/create');
    }
    
   
 return <div className="container">
 <div className="profile-container">
 
 <img src={image} alt="Hello" className="profile"/>
 <h3>Name : {name}</h3>
 <h3>Email: {email}</h3>
 <h4>Phone : {phone}</h4>
 <h4>Date : {date}</h4>
 <button onClick={logout} className="logout">Logout</button>
 <div className="Btn">
 <button onClick={()=>nav(`/editsPosts/${id}`)}>Edits</button>
 <button onClick={createBtn}>New+</button>
 </div>
 </div>
 <hr/>
 {
    posts.map((d,i)=>(
        <div key={i} className="post">
        <div className="creater">
        <img src={image} />
        <p>{name}</p>
        <p><span>{d.time}</span></p>
        </div>
        <h4>Title : {d.title}</h4>
        <div>
        <Link to={{pathname:`/detailP/${d.id}`,state:{postId:d.id}}}>
        <img src={d.post_URL} className="post_img" />
        </Link>
        </div>
        <p>Contact : {d.body}</p>
        <hr/>
        </div>
    ))
 }
 </div>
}
export default Profile;