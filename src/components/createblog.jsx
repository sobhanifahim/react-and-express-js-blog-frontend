import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import cblog from '../style/createblog.module.css'
export default function Createblog() {
    const [formData, setFormdata] = useState({
        title: '',
        content: '',
        image: null, 
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormdata({ ...formData, [name]: files[0] });
        } else {
            setFormdata({ ...formData, [name]: value });
        }
    };
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('image', formData.image); // Append the image file

        try {
            const response = await axios.post('http://localhost:8000/createblog', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
                },
            });

            console.log(response.data);
            navigate("/home")
        } catch (error) {
            console.log('Error sending data', error);
        }
    };

    return (
        <div className={cblog.container}>
            <h2>Create Your Blog</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="image">Upload Image:  </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*" // Restrict to image files
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Title:</label><br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div><br />
                <div>
                    <label htmlFor="content">Blog Content:</label><br/><br/>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea><br />
                </div>
                <div className={cblog.bdiv}>
                    <button type="submit" className={cblog.btn}>Create Blog</button>
                </div>
            </form>
        </div>
    );
}
