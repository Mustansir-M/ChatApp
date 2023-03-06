import React, { useState } from 'react'
import '../Styles/regStyles.css'
import img1 from "../assets/images/addAvatar.png"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage} from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate,Link } from 'react-router-dom';


// can create use state for each input or onsubmit event for whole form
const Register = () => {

  const [err,setErr]=useState(false)

  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(e.target[0].value)

    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];



   try{

     const res=await createUserWithEmailAndPassword(auth, email, password)

   
    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    uploadTask.on(
      (error) => {
        setErr(true)
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user,{
            displayName,
            photoURL:downloadURL
          });
          await setDoc(doc(db,"users",res.user.uid),{
            uid:res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });

          await setDoc(doc(db,"userChats",res.user.uid),{});
          navigate("/home");

        });
      }
    );


   }catch(err){
    setErr(true)  //if there is an error then making it true
   }
      
}
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className='logo' style={{color:'rgb(48, 20, 188)', fontSize:24, fontWeight:"bold"}}>Karlo Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your username'></input>   
                <input type="email" placeholder='Enter your email'></input> 
                <input type="password" placeholder='Enter your password'></input>         
                <input style={{display:"none"}}type="file" id="file"></input>
                <label className="add-label1" htmlFor='file'>
                    <img src={img1} alt='Add an image'></img>
                    <label className='add-label2'>Add an avatar</label>
                </label>
                <button>Sign Up</button>
                {err && <span>Sorry, but an error occured!</span>}
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register