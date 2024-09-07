import React, { useEffect, useState } from "react";
import { useAuth } from "../../layout/AuthProvider";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import moment from "moment";
function EditPost(){
    const{id : postId} = useParams();
    const time = moment().format('lll');
    const {id} = useAuth();
    const [data,setData] = useState({
        body :'',
        time :time,
        post_URL :'',
        userId : `${id}`
    });
    const [initial,setInitial] = useState({
        body : '',
        post_URL: ''
    })
    const nav = useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8000/posts/${postId}`)
        .then(res=>{
            setInitial(res.data);
            setData(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[postId]);
    const handleEditsPost =(e)=>{
        e.preventDefault();
       const {body , post_URL,time} = data;
       const requestData = {
        body : body.trim()==='' ? initial.body : body,
        post_URL : post_URL.trim()==='' ? initial.post_URL :post_URL,
        time : time,
        userId : id
       }
       if(post_URL.trim() == ''){
        delete requestData.post_URL;
       }
         if (body.trim()===''){
       delete requestData.body;
       }
        axios.put(`http://localhost:8000/posts/${postId}`,requestData)
        .then(res=>{
            alert("Edits Successfull!");
            nav('/profile');
        })
        .catch(err=>{
            console.log("Id is this :",id);
            console.log(err);
            alert("edits fails");
        })
    }

    return <div className="EditsPost">
    <form onSubmit={handleEditsPost}>
    <h2>Edits Post....</h2>
    <label >Edit Contact *</label><br/>
    <input type="text" placeholder="You Can write here" 
    onChange={(e)=>setData({...data,body:e.target.value})} /><br/>
    <label>Edit Image *</label><br/>
    <input type="text" placeholder="You can Input image link" 
    onChange={(e)=>setData({...data,post_URL:e.target.value})} /><br/>
    <button type="submit">Edits</button>
    </form>
    </div>
}
export default EditPost;