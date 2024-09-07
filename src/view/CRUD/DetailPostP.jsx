import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../layout/AuthProvider";
import { useNavigate } from "react-router";
import db from "../../jsonData/data.json"
function DetailPostP(){
    const {id} = useParams();
    const [Data,setData] = useState([]);
    const [comment,setComment] = useState([]);
    const nav = useNavigate();

    const {id:currentID} = useAuth();
    //Show Posts -----------------------
    useEffect(()=>{
        axios.get(`http://localhost:8000/posts/${id}`)
        .then(res=>{
            setData(res.data);
            axios.get(`http://localhost:8000/comments?postId=${id}`)
            .then(res => setComment(res.data))
            .catch(err => console.log(err));
        })
        .catch(err=>console.log(err))
        
    },[id])
    const getUserData =(userId)=>{
        const user = db.user.find(user => user.id === userId);
        return user ? user : { image: 'default_user_image_url', name: 'Unknown User' };
    }
    const deletePost = (postId) => {
        const confirmDelete = window.confirm("Do you want to delete this comment?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8000/posts/${postId}`)
                .then(res => {
                    axios.get(`http://localhost:8000/posts?userId=${id}`)
                        .then(res => {
                            setData(res.data);
                            nav('/profile')
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    };
    return <div className="detail">
    
    
    
    <div className="detail-container">
       <div>
       <img src={Data.post_URL} className="post_img" />
       </div>
       <div className="text">
       <p>Title : {Data.title}</p>
       <p>Contact : {Data.body}</p>
       <p>Time : {Data.time}</p>
       <div className="ProfileBtn">
       <button onClick={()=>deletePost(Data.id)}   >Delete</button>
       <button onClick={()=>nav(`/edits/${Data.id}`)}   >Edit</button>
    </div>
       </div>
       </div>
    <p>Comment : </p>
    <ul>
{
    comment.map(comment=>(
        <li key={comment.id}>
      {
        
            <div className="comment">
            <div className="creater">
             <img src={getUserData(comment.userId).image} />
            <p>{getUserData(comment.userId).name}</p>
            </div>

            <div className="comment_contain">
            <h3>{comment.body}</h3>
            </div>
            
            </div>
      }
      <hr/>

        </li>
    ))
}
</ul>

</div>
}
export default DetailPostP;