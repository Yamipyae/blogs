import axios from "axios";
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
function Home(){
    const[Data,setDate] = useState([]);
    const[user,setUser] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8000/posts?_sort=id&_order=desc")
        .then(res=>setDate(res.data))
        .catch(err=>console.log(err))
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8000/user")
        .then(res=>setUser(res.data))
        .catch(err=>console.log(err))
    },[])
    const getUserID =(userId)=>{
        return user.find((user)=>user.id==userId);
    }
    return <div className="home">
    {
        Data.map((d,i)=>(
            <div key={i} className="home-post">
            {
                getUserID(d.userId) && (
                
                    <div className="creater">
                    <img src={getUserID(d.userId).image} />
                    <p>{getUserID(d.userId).name}</p>
                    <p><span>{d.time}</span></p>
                    </div>
                   
                    
                )
            }
            <h4>Title : {d.title}</h4>
            <div >
            <Link to={{pathname:`/detail/${d.id}`,state:{postId:d.id}}}>
            <img src={d.post_URL} className="post_img" />
            </Link>
            </div>
            <p>contact : {d.body}</p>
            <hr/>
            </div>
        ))
    }
    </div>
}
export default Home;