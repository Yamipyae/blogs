import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
function Nav(){
    const {name,image} = useAuth();
    return <nav>
    <Link to='/'>Posts</Link>
    <div className="nav-mid">
    
    <Link to='/profile'>Profile</Link>
    </div>
    <div >
    {
        name ? (
            <div className="creater">
        <img src={image} />
        <p>{name}</p>
        </div>
        ) :
        (
            <div className="nav-end">
            <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
            </div>
        )
    }
    </div>
    
    </nav>
}
export default Nav;