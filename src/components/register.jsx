import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import signup from '../style/register.module.css'

export default function Register() {
    const[formData,setFormdata]=useState({
        username:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormdata({...formData,[name]:value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/register', formData);
      
          if (response.status === 201) {
            
            console.log(response.data.message,response.status);
            
          } else {
            
            console.error('Registration failed:', response.data.message);
            
          }
        } catch (error) {
          console.log('Error:', error);
          
        }
      };
      
   return(
    <div className={signup.registerform}>
    <h3>SignUp</h3>
    <form onSubmit={handleSubmit}>
      <div>
      
      <FontAwesomeIcon icon={faUser} />     <input
          placeholder="username"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        
      <FontAwesomeIcon icon={faEnvelope} />      <input
          placeholder="email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
       
      <FontAwesomeIcon icon={faKey} />      <input
          placeholder="password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit" className={signup.btn}>Register</button>
      </div>
    </form>
  </div>
   );    
};
