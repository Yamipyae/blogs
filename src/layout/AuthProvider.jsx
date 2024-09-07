import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthProvider = React.createContext();

export const AuthCon = ({children}) =>{
const storedUser = JSON.parse(localStorage.getItem('user'));   
const[name,setName] = useState(storedUser?.name||'');
const[image,setImage] = useState(storedUser?.image||'');
const[email,setemail] =useState(storedUser?.email||'');
const[id,setId] =useState(storedUser?.id||'');
const[phone,setPhone] = useState(storedUser?.phone||'');
const[date,setDate] = useState(storedUser?.date || '');
const login = (data)=>{
    setName(data);
    localStorage.setItem("user", JSON.stringify(data));
}
const logout =(data)=>{
    localStorage.removeItem('user');
    setName(null);
    setemail(null);
    setImage(null);
    setPhone(null);
    setDate(null);
}

    return <AuthProvider.Provider value={{
        name,setName,
        login,logout,
        image,setImage,
        email,setemail,
        id,setId,
        phone,setPhone,
        date,setDate,
    }}>{children}</AuthProvider.Provider>
}

export const useAuth=()=>{
    return useContext(AuthProvider);
}