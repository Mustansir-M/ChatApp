import React, { useState } from 'react'
import '../Styles/regStyles.css'
import img1 from "../assets/images/addAvatar.png"
import { useNavigate,Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"

const Login = () => {

    const [err,setErr]=useState(false)
  
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
      e.preventDefault()
      
  
      
      const email=e.target[0].value;
      const password=e.target[1].value;
      
  
  
  
     try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/home")

  
     }catch(err){
      setErr(true)  //if there is an error then making it true
     }
        
  }
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className='logo' style={{color:'rgb(48, 20, 188)', fontSize:24, fontWeight:"bold"}}>Karlo Chat</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>   
                <input type="email" placeholder='Enter your email'></input> 
                <input type="password" placeholder='Enter your password'></input>         
                <input style={{display:"none"}}type="file" id="file"></input>
                <button>Login</button>
                {err && <span>Sorry, but an error occured!</span>}
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login