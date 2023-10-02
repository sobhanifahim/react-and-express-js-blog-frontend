import axios from "axios";
import { useState } from "react";

export default function Login() {
    const[formData,setFormdata]=useState({
        username:'',
        password:''
    })
    const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormdata({...formData,[name]:value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.post('http://localhost:8000/',formData)
            console.log(response.data) 
        }catch(error){
           console.log(error.response)
        }
    }
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
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
   );    
};
