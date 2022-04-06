import { useState } from 'react';
import { io } from "socket.io-client";

const Screen = () => { 
  const socket = io();

 

  const videoElem = document.getElementById("video");

  socket.on('screen', (msg) => {

    console.log(msg);
    videoElem.srcObject= msg
   
  });

  const displayMediaOptions = {
      video: {
        cursor: "always"
      },
      audio: false
    };
     
   const  startCapture = async () => {
    const videoElem = document.getElementById("video");
      try {
        const x = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        videoElem.srcObject= x
       
        socket.emit('screen', x );
      } catch(err) {
        console.error("Error: " + err);
      }
  }

  const  stopCapture = (evt) => {
    const videoElem = document.getElementById("video");
    const tracks = videoElem.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    setVideoElem(null);
  }
  

    return(
        <div className="container" >
          
            <button onClick={startCapture} >Start Capture</button>
            <button  onClick={ stopCapture } >Stop Capture</button>

            <video id="video" style={{ position: "absolute", left:0 , top:'100px'  ,  width:'100vw', height:'80%' , border: '1px solid black'}} autoPlay></video>
            
            
        </div>
    )

}
export { Screen }