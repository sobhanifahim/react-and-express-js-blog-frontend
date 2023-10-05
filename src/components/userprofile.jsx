import axios from "axios";
import { useEffect, useState } from "react";
import profile from '../style/userprofile.module.css'
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
        
              {user !== null ? (
                <>
                    <h4 className={profile.name}>Hello {user.name}</h4>
                    <div className={profile.container}>
                    <img src={user.userImageDataUri} alt="" className={profile.pimage} />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <br />
             <form onSubmit={handleSubmit} className={profile.inp}>
                <div >
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
                <div className={profile.pbtn}>
                    <button type="submit" className={profile.btn}>Upload</button>
                </div>
            </form>
        </>
    );
};
