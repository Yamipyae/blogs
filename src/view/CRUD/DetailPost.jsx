import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../layout/AuthProvider";
import db from "../../jsonData/data.json"
import moment from "moment/moment";
function DetailPost(){
    const {id,userId} = useParams();
    const nav = useNavigate();
    const [Data,setData] = useState([]);
    const [comment,setComment] = useState([]);
    const [newComment,setNewComment] = useState('');
    const [commentID,setCommentID] = useState(null);
    const [updateText,setUpdateText] = useState('');
    const {id:currentID,name,email,image,phone,date} = useAuth();
    const ctime = moment().format('lll');
    const handleComment = (e) =>{
        e.preventDefault();
        if(newComment.trim()===''){
            alert("please Enter Comment");
        }
       else{
        axios.post("http://localhost:8000/comments",{
            postId : id,
            userId:currentID,
            body : newComment,
            ctime : ctime
        }).then((res=>{

            setNewComment('');
            //Fetch comment again after adding a new comment
            axios.get(`http://localhost:8000/comments?postId=${id}`)
            .then((res)=>{
                setComment(res.data);
                
            })
            .catch(err=>console.log(err));
        })).catch(err=>console.log(err))
       }
    }
    //Show Comment -----------------------
    useEffect(() => {
        if (!name || !email || !image || !phone || ! date) {
            nav('/login');
        }
    }, [name, email, image,date,nav]);
    useEffect(()=>{
        axios.get(`http://localhost:8000/posts/${id}`)
        .then(res=>{
            setData(res.data);
            axios.get(`http://localhost:8000/comments?postId=${id}&_sort=id&_order=desc`)
            .then(res => setComment(res.data))
            .catch(err => console.log(err));
        })
        .catch(err=>console.log(err))
        
    },[id])

    // delete Comment ----------------------
    const deleteComment = (commentId,userId) => {
        const confirmDelete = window.confirm("Do you want to delete this comment?");
        console.log(userId);
        if (userId === currentID) {
            if(confirmDelete){
            axios.delete(`http://localhost:8000/comments/${commentId}`)
                .then(res => {
                    alert("Delete comment successful");
                    axios.get(`http://localhost:8000/comments?postId=${id}`)
                        .then(res => setComment(res.data))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }
    else {
        alert("You cannot access delete this comment!!");
    }
    };
    //update Comment toggle , if click update turn save
    const toggleEdit = (commentId, currentText) => {
        setCommentID(commentId);
        setUpdateText(currentText);
    };

    const editCom = (commentId)=>{
        axios.put(`http://localhost:8000/comments/${commentId}`,{
            userId:currentID,
            postId : id,
            body : updateText,
            ctime : ctime,
        }).then(res=>{
            axios.get(`http://localhost:8000/comments?postId=${commentId}`)
            .then(res=>{
                setComment(res.data)
            })
            .catch(err=>(alert("second error")))
        })
        .catch((err)=>(
            alert("Error Fail .........")
        ))
    }
    const getUserData =(userId)=>{
        const user = db.user.find(user => user.id === userId);
        return user ? user : { image: 'default_user_image_url', name: 'Unknown User' };
    }
    return <div className="detail">
       <div className="detail-container">
       <div>
       <img src={Data.post_URL} className="post_img" />
       </div>
       <div className="text">
       <p>Title : {Data.title}</p>
       <p>Contact : {Data.body}</p>
       <p>Time : {Data.time}</p>
       </div>
       </div>
       
        
        <p>Comment : </p>
        <ul>
    {
        comment.map(comment=>(
            <li key={comment.id}>
          {
            commentID === comment.id ? (
                <div className="comment">
                <div className="creater">
                <img src={getUserData(comment.userId).image} />
               <p>{getUserData(comment.userId).name}</p>
               <p><span>{comment.ctime}</span></p>
               </div>
                <input type="text" value={updateText}
                onChange={(e)=>setUpdateText(e.target.value)}/>
                <button onClick={()=>editCom(comment.id)}>save</button>
                </div>
                
            ) :(
                <div className="comment">
                <div className="creater">
                 <img src={getUserData(comment.userId).image} />
                <p>{getUserData(comment.userId).name}</p>
                <p><span>{comment.ctime}</span></p>
                </div>

                <div className="comment_contain">
                <h3>{comment.body}</h3>
                <button onClick={()=>toggleEdit(comment.id,comment.body)}>update</button>
                <button onClick={()=>deleteComment(comment.id,currentID)}>delete</button>
                </div>
                
                </div>
            )
          }
        <hr/>

            </li>
        ))
    }
    </ul>
    <form onSubmit={handleComment}>
    <input type="text" placeholder="Enter comment" name="comment" value={newComment}
    onChange={(e)=>setNewComment(e.target.value)} />
    <button type="submit">Comment</button>
    </form>
    </div>
}
export default DetailPost;