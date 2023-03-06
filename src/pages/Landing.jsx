import React from 'react';
import { motion } from 'framer-motion';
// import './App.css';
import '../Styles/landingStyles.css'
import chat1 from "../assets/images/chat1r.png"
import chat2 from "../assets/images/chat2.jpg"
import chat3 from "../assets/images/chat3r.png"
import chat4 from "../assets/images/chat4.png"


import app1 from "../assets/images/app1r.png"
import app2 from "../assets/images/app2r.png"
import app3 from "../assets/images/app3r.png"
import { Link } from 'react-router-dom';

function Landing() {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const appvariants={
    visible:{
        scale:2,
        opacity:1,
        y:10,
        transition:{
            opacity:{
                duration:2,
                ease:"easeInOut",
                // delay:2,
            },
            y:{
                duration:1,
                repeat:Infinity,
                repeatType: "reverse",
                ease:"easeInOut",
                // delay:2,

            }
        }
    },
    hidden:{opacity:0}
  }

  return (
    <motion.div className="Appp" initial="hidden" animate="visible" transition={{duration:1, ease:"easeInOut"}} variants={variants}>
      <motion.header className="headerr" variants={variants}>
        <motion.img
        src={chat1}
        animate={{scale:2}}
        transition={{duration:4, repeat:Infinity, repeatType:"reverse"}}
        className="chat-1 chatt"
        alt="chat 1"
        />

        <motion.img
        variants={appvariants}
        initial="hidden"
        animate="visible"
        src={app1}
        className="app-left apppy"
        alt="app left"/>


        
        <motion.h1 variants={variants}>Karlo Chat!</motion.h1>

        <motion.p variants={variants}>Connecting people from all over the world, and engaging communication</motion.p>


        
        

        <motion.div className="button-containerr" variants={variants}>
            <a href="/register">
          <motion.button className="buttonn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Register</motion.button></a>

          <a href="/login">
          <motion.button className="buttonn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Login</motion.button></a>
        </motion.div>
      </motion.header>
    </motion.div>
  );
}

export default Landing;
