import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Readblog() {
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
    console.log()
    
    return (
        <>
          <img src={arrayBufferToBase64(blogData.bimg.data)} alt="" height="200px" width="400px"/>
          
          
          <button onClick={handleDelete}>Delete blog</button>
          
          
          <br />
          <h1>{blogData.title}</h1>
          <i><b>Author:</b> {blogData.author}</i>
          <p>Created at: {blogData.created_at}</p>
          <h2>{blogData.content}</h2>
          <form onSubmit={handleSubmit}>
            <div>
                <textarea
                type="text"
                id="comment"
                name="comment"
                value={comments.comment}
                onChange={handleChange}
                required
                />
            </div>
            <div>
              <button type="submit">post</button>
            </div>
          </form>
          {opinion.map((cmnt)=>(
            <div key={cmnt.cid}>
             <i>{cmnt.commenter}</i>
             <p>{cmnt.comments}</p>
            </div>
          ))}
        
        </>
    );
}

function arrayBufferToBase64(buffer) {
    const binary = [].slice.call(new Uint8Array(buffer));
    const base64 = btoa(binary.map((byte) => String.fromCharCode(byte)).join(''));
    return `data:image/jpeg;base64,${base64}`;
}
