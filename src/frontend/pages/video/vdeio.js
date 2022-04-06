import { io } from "socket.io-client";
import { useState } from 'react';

const Vdeio = (params) => {

    
    const socket = io('http://localhost:5000/');
    const [ cam ,setCam ] = useState(true);
    const [ audio ,setAudio] = useState(true);

    const myPeer = new Peer(undefined, {
        host:'/',
        port:'5005'
    })

    
    const on = async ()=>{
        const videoElem = document.getElementById("video");
        const myVideo = document.createElement('video') ;
       const stream = await  navigator.mediaDevices.getUserMedia({
            video:{ width:'100%' , height:'100%' },
            audio:audio
        });
        videoElem.srcObject= stream ;
      
    };
    const of = ()=>{
        const videoElem = document.getElementById("video");
        const tracks = videoElem.srcObject.getTracks();
        tracks.forEach(track =>{ 
            console.log(track);
            if(track.kind === 'audio')
            {
                track.stop();
            }
            if(track.kind === 'video')
            {
                track.stop();
            }
        });
    };

    return(
        <div id='videoGrid' >
            <button onClick={ on } > camera on </button>
            <button onClick={ of } > camera of </button>
               <video id="video"  style={{  width:'400px' , height:'200px',  border: '1px solid black'}} autoPlay></video>
        </div>
    )
}
export { Vdeio }