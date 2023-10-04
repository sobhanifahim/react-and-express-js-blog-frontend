import axios from "axios";
import { useEffect, useState } from "react";
export default function Userprofile() {
    const [user,setUser]=useState(null)
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('http://localhost:8000/userprofile')
        .then((response)=>{

          setUser(response.data)
        })
        .catch((error)=>{
             console.log('Error getting data',error)
        })
    })
    const [formData, setFormdata] = useState({
        image: null, 
    });

    const handleChange = (e) => {
        const { name, files } = e.target;
        setFormdata({ ...formData, [name]: files[0] });
        
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image); // Append the image file

        try {
            const response = await axios.post('http://localhost:8000/userprofile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
                },
            });
            setFormdata({image:null});
            console.log(response.data);
        } catch (error) {
            console.log('Error sending data', error);
        }
    };
    return(
        <>
        <h3>Hello</h3>
              {user !== null ? (
                <>
                    <p>{user.name}</p>
                    <img src={user.userImageDataUri} alt="" height="200px" width="200px" />
                </>
            ) : (
                <p>Loading...</p>
            )}
             <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Upload Image:</label>
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
                    <button type="submit">Upload</button>
                </div>
            </form>
        </>
    );
};
