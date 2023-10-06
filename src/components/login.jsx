import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import signin from '../style/login.module.css'


export default function Login() {
    const[formData,setFormdata]=useState({
        username:'',
        password:''
    })
    const [error,setError]=useState('')
    const { setUser } = useUser(); 
    const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormdata({...formData,[name]:value})
    }
    axios.defaults.withCredentials=true;
    const navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.post('http://localhost:8000/',formData)
            setUser(response.data)
            navigate('/home')
        }catch(error){
           console.log(error.response.data.message)
           setError(error.response.data.message)
        }
    }
   return(
    <div className={signin.loginform}>
     <h3>Sign In</h3>
    <form onSubmit={handleSubmit}>
      <div>
      <FontAwesomeIcon icon={faUser} />     <input
          placeholder="Username"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
      <FontAwesomeIcon icon={faKey} />      <input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit" className={signin.btn}>Login</button>
      </div>
    </form>
    <b style={{color:"red"}}>{error}</b>
    <p>Don't have an account?  <Link to='/register' className={signin.register}>SignUP</Link><br/></p>
  </div>
   );    
};
