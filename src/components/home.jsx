import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [data,setdata]=useState(null)

    useEffect(()=>{
          axios.get('http://localhost:8000/home')
          .then((response)=>{
            console.log(response.data)
            setdata(response.data)
          })
          .catch((error)=>{
               console.log('Error getting data',error)
          })
    },[])
    return(
        <>
        <button>Create blog</button>
        </>
    );
};
