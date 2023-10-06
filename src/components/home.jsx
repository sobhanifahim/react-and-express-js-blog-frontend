import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import home from '../style/home.module.css';
import {Link} from "react-router-dom";

export default function Home() {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/home')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log('Error getting data', error);
            });
    });
    const navigate = useNavigate();
    const navigateToCreateBlog = (blogData) => {
      navigate("/readblog", { state: { blogData } });
  };
  const handleLogout=()=>{
    axios.get('http://localhost:8000/logout')
    .then((response)=>{
       console.log(response.data);
       navigate("/")
    })
    .catch((error)=>{
       console.log('Error logging out',error)
    })
  }

    return (
        <>
        <div className={home.nav}>
            <ul className={home.menu}>
            <li ><Link to={"/createblog"} style={{textDecoration:"none",color:"black"}}>Create Blog</Link></li>
                <li><Link to={"/profile"} style={{textDecoration:"none",color:"black"}}> Profile</Link></li>
                <li><div onClick={handleLogout}>Logout</div></li>
                
            </ul>
            
        </div>
        <h3>Latest Posts</h3>
        <hr className={home.line}/>
        <div className={home.showblogdiv}>
            {data !== null ? (
                data.map((blog) => (
                    <div key={blog.bid}  className={home.blog}>
                        {blog.bimg !== null && blog.bimg.type === 'Buffer' ? (
                            <img src={arrayBufferToBase64(blog.bimg.data)} alt=""  className={home.blogimg}/>
                        ) : (
                            <p>No image available</p>
                        )}
                        <div className={home.blogcontent}>
                        <h4 className={home.title}>{blog.title}</h4>
                        <i><b>Author: </b>{blog.author}</i>
                        <p className={home.blogtext}>{blog.content}</p>
                        <button onClick={()=>navigateToCreateBlog(blog)} className={home.bbtn}>Continue → </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </>
    );
}

// Function to convert a Buffer to base64

function arrayBufferToBase64(buffer) {
    const binary = [].slice.call(new Uint8Array(buffer));
    const base64 = btoa(binary.map((byte) => String.fromCharCode(byte)).join(''));
    return `data:image/jpeg;base64,${base64}`;
}
