import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../layout/AuthProvider";
import moment from "moment/moment";
function CreatePost(){
    const {id} = useAuth();
    const date = moment().format('lll');
    const [input,setInput] = useState({
        title: '',
        time : date,
        body : '',
        post_URL : '',
        userId :`${id}`
    });
    
    const nav = useNavigate();
    const handlePost=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/posts?userId=${id}`,input).then(res=>{
            alert("Post Successfull!!");
            nav('/profile');
        }).catch(err=>{
            alert("post fail!");
            console.log(err);
        })
        
    }

    return <div className="createPost">
    <form onSubmit={handlePost}>
    <h1>Create Post....</h1>
    <label>Contect *</label><br/>
    <input type="text" name="text" placeholder="Enter On your mind" 
    onChange={(e)=>setInput({...input,body:e.target.value})} /><br/>

    <label>Title *</label><br/>
    <input type="text" name="title" placeholder="Enter On your mind" 
    onChange={(e)=>setInput({...input,title:e.target.value})} /><br/>

    <label>Image_URL *</label><br/>
    <input type="text" name="text" placeholder="What image do you post" 
    onChange={(e)=>setInput({...input,post_URL:e.target.value})} /><br/>

    <button type="Submit" >Post</button>
    </form>
    </div>
}
export default CreatePost;