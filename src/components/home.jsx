import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

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
    }, []);
    const navigate = useNavigate();
    const navigateToCreateBlog = (blogData) => {
      navigate("/readblog", { state: { blogData } });
  };

    return (
        <>
            <button onClick={() => navigate("/createblog")}>Create blog</button>
            {data !== null ? (
                data.map((blog) => (
                    <div key={blog.bid} style={{ backgroundColor: "grey", height: "350px", width: "600px", marginTop: "2%" }}>
                        {blog.bimg !== null && blog.bimg.type === 'Buffer' ? (
                            <img src={arrayBufferToBase64(blog.bimg.data)} alt="" height="200px" width="600px" />
                        ) : (
                            <p>No image available</p>
                        )}
                        <h3>{blog.title}</h3>
                        <p>{blog.author}</p>
                        <button onClick={()=>navigateToCreateBlog(blog)}>read</button>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

// Function to convert a Buffer to base64

function arrayBufferToBase64(buffer) {
    const binary = [].slice.call(new Uint8Array(buffer));
    const base64 = btoa(binary.map((byte) => String.fromCharCode(byte)).join(''));
    return `data:image/jpeg;base64,${base64}`;
}
