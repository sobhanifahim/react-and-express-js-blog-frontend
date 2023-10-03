import axios from "axios";
import { useState } from "react";

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
    <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
   );    
};
