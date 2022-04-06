import React from 'react';
import logo from '../../images/Logo.png';
import { motion } from "framer-motion";
import { useState } from 'react';
import "./loading.css";    


const Loading = () => { 
    const [ dis,setDis ] = useState('block');

    setTimeout(()=>{
        setDis('none')
    },7000);

    return (
    <motion.div 
    style={{display:dis}}
    initial={{opacity:1}}
    animate={{opacity:0}}
    transition={{ delay:3 , duration:0.5 }}
    className="loading_container">

        <motion.div className="box"
            initial={{opacity:1}}
            animate={{opacity:0}}
            transition={{ delay:5 , duration:0.5 }}
        >
           
        <motion.h2
            initial={{y:'-100px',opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{ duration:1 }}
        > welcome to </motion.h2>
        
        <motion.img 
         initial={{y:'100px',opacity:0}}
         animate={{y:0,opacity:1}}
         transition={{ duration:1 }}
        src={logo}
        />
           <motion.div 
               initial={{y:'100px',opacity:0}}
               animate={{y:0,opacity:1}}
               transition={{ duration:3 }}
           className="loading_text">
       
        </motion.div> 

        <motion.p 
                initial={{y:'100px',opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{ duration:3 }}
        className="loading_copy_right">© 2022 direct, Inc</motion.p>
        </motion.div>
  
    </motion.div>
 )}

 export { Loading }