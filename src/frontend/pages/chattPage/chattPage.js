import { io } from "socket.io-client";
import { useState,useEffect } from 'react';
import { FiSmile } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import Picker from 'emoji-picker-react';
import { DragDrop } from '../../component/drag-drop';

import './chatt.css';

const socket = io.connect('https://chatt-test.herokuapp.com/');



const Chatt = () => { 


    


    const [input , setInput] = useState('');
    const [message , setMessage] = useState([]);
    const [EmojiBox, setEmojiBox] = useState(false);
    const [Room, setRoom] = useState('');
    const [User, setUser] = useState('');
    
    

    const creatRoom = () => {
        let userName = prompt('user name');
        let roomName = prompt('room name');
        setRoom(roomName);
        setUser(userName);

        socket.emit('create', roomName );
        
    }
  

    useEffect(()=>{
      
        socket.on('message', ({ username,massage,room }) => {
            const d = new Date();
            setMessage([ ...message, { username:username,massage:massage , time:`${d.getHours()}:${d.getMinutes()} hr`,room:room } ]);
            setInput('');
        })
    });

    const onEmojiClick = (event, emojiObject) => {
        const x = `${input} ${emojiObject.emoji}`;
        setInput(x);
      };

   

    const send = () => {
        if(input !== '')
        {
            socket.emit('message',{ username:User,massage:input,room:Room } );
            setEmojiBox(false)
        }
    }
    setTimeout(()=>{
       const upload = document.querySelector('.sc-bczRLJ')
       const uploadt = document.querySelector('.fVfcRr')
       
        uploadt.style.display='none';
        upload.style.position='absolute';
        upload.style.marginTop='-33px';
        upload.style.marginLeft='-2.2px';
        upload.style.minWidth='30px';
        upload.style.maxWidth='30px';
        upload.style.maxHeight ='30px';
    },1);
  
    return(
        <div className="chatBox"  >
            <div className="rooms"> rooms </div>
            <div className="Chatt" >
        
                <ul className='box' >
                    { 
                    message.map((e,key)=>{

                        return <div key={ key } className="massageBox" > 
                            <div className="imgBox" key={ key+1 } > A </div> <snap key={ key+2 } className='username' > { e.username } </snap>
                            <snap key={ key+4 } className='time' >{ e.time } </snap>
                            <li className='massage' key={ key+3 }> {e.massage} </li>
                            
                        </div>
                    })
                    }
   

                </ul>

            </div>
                  
            
            <div className="messageBox" >
                <button onClick={ ()=>{ creatRoom() }}  > creat Room  </button>
                    <div className="iconsBox" >
                        <DragDrop  />
                        <AiOutlineDeliveredProcedure size='25px' position='fixed' color='gray' />
                        <FiSmile size='25px' color='gray' 
                        onClick={()=>{ 
                            
                            (EmojiBox)? setEmojiBox(false) :setEmojiBox(true) ;

                        }} />
                        
                    </div>
                
                    <textarea  placeholder='your massage'  value={input}  className='input'  
                    onKeyPress={(e)=>{(e.code=='Enter')? send():'' }}
                    onChange={ (e)=>{ setInput(e.target.value);  } }
                    />
                   
                    <div className='sendBox'>
                        <FaTelegramPlane size='25px' color='#5594f2'
                         
                        onClick={ ()=>{ 
                            send()
                            
                        
                        }}/>
                    </div>
                
            </div>

            {
                (EmojiBox)?
                <Picker position='absolute' onEmojiClick={onEmojiClick} />
                :
                ''
            }

        </div>
    )
 }
 export { Chatt }








