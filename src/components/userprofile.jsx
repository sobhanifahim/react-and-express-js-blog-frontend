import axios from "axios";
import { useEffect, useState } from "react";
export default function Userprofile() {
    const [user,setUser]=useState(null)
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('http://localhost:8000/userprofile')
        .then((response)=>{
          console.log(response.data)
          setUser(response.data)
        })
        .catch((error)=>{
             console.log('Error getting data',error)
        })
    },[])
    return(
        <>
        <h3>Hello</h3>
        </>
    );
};
