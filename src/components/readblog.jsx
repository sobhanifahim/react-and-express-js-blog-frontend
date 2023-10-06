import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from "./UserContext";
import rblog from '../style/readblog.module.css'

export default function Readblog() {
    const {user}=useUser();
    const [comments,setComments]=useState({
        comment:'',
    })
    const [opinion,setOpinion]=useState([])
    
    const location = useLocation();
    
    const blogData = location.state?.blogData || null;

    useEffect(()=>{
        axios.get(`http://localhost:8000/readblog/${blogData.author}/${blogData.bid}`)
        .then((response)=>{
           setOpinion(response.data)
        })
        .catch((error)=>{
            console.log('Error fetching data', error)
        })
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setComments({...comments,[name]:value})
     }
    const navigate = useNavigate();
    axios.defaults.withCredentials=true;
    const handleDelete=()=>{
        axios.delete(`http://localhost:8000/readblog/${blogData.author}/${blogData.bid}`)
        .then((respone)=>{
               console.log(respone.data);
               navigate("/home");
        })
        .catch((error)=>{
               console.log('Error sending data',error)
        })
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
             const response= await axios.post(`http://localhost:8000/readblog/${blogData.author}/${blogData.bid}`,comments)
             console.log(response.data)
             setComments({ comment: '' });
        }catch(error){
            console.log(error.response)
        }


    }
    
    return (
        <div className={rblog.conatiner}>

          <div className={rblog.designdiv}></div>
          <div className={rblog.content}>
          <img src={arrayBufferToBase64(blogData.bimg.data)} alt="" className={rblog.bimg}/><br />
          
          {user.id===blogData.uid ?
          <div className={rblog.dbtncontainer}>
          <button onClick={handleDelete} className={rblog.dbtn}>Delete blog</button> </div>: ''
          }
          
          <br />
          <h1>{blogData.title}</h1>
          <div className={rblog.ainfo}>
          <i><b>Author:</b> {blogData.author}</i>
          </div>
          <p>Created at: {blogData.created_at}</p>
          <hr />
          <div className={rblog.blogcontent}>
          <p >{blogData.content}</p>
          </div>
          <form onSubmit={handleSubmit} className={rblog.commentbox}>
            <div >
                <textarea
                
                type="text"
                id="comment"
                name="comment"
                value={comments.comment}
                onChange={handleChange}
                required
                />
            </div> 
            <div style={{marginLeft:"1%"}}>
              <button type="submit" className={rblog.pbtn}>post</button>
            </div>
          </form>
          {opinion.map((cmnt)=>(
            <div key={cmnt.cid} className={rblog.comments}>
             <div className={rblog.icomments}>
             <i className={rblog.commenter}>{cmnt.commenter}</i><br />
             <text>{cmnt.comments}</text><br />
             </div>
            </div>
          ))}
          </div>
        
        </div>
    );
}

function arrayBufferToBase64(buffer) {
    const binary = [].slice.call(new Uint8Array(buffer));
    const base64 = btoa(binary.map((byte) => String.fromCharCode(byte)).join(''));
    return `data:image/jpeg;base64,${base64}`;
}
