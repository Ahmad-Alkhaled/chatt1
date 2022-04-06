require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {uuid} = require('uuidv4');
const path = require('path');


// ----------- variables ----------------------------

const io = new Server(server, {
    cors: {
      origin: "https://chatt-test.herokuapp.com/",
      methods: ["GET", "POST"],
    },
});

const URL_DB = `mongodb://localhost:27017/vedioChattt`;

const port = process.env.PORT || 5000;

// ----------- import fils. -----------------------------

const User = require('./model/Usermodel');

// ----------- app.use(). -----------------------------

app.use(cors());
app.use( '/static' ,express.static(path.join(__dirname, '../../dist'), { index: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header
    (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "*")
    
    next();
});
// ----------- controllers. -----------------------------


const createHash = (password) =>
{const secret ='Ahmad';
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
}


app.post('/create/user', async  (req, res) => {

    const { 
        username ,
        email , 
        password , 
        } = req.body;
        console.log(req.body);
       

    try{
        // mongoose.connect(URL_DB);
        // const user = new User({
        //     username:username,
        //     email:email,
        //     password:password,
        // });
       

        // const x = await user.save();
        // mongoose.connection.close();
        // res.end();

    }catch(err){
        res.status(400).json({
            message:'error in post,"/create/user" :60',
            error:err
        });
    };
 
});


app.post('/login', async  (req, res) => {

   
    const { 
        email,
        password  
        } = req.body;

    try{
        mongoose.connect(URL_DB);
        const email1 = await User.findOne({email:email});
       if(email1.password == createHash(password) )
       {
           res.status(200).json({
               success: true,
               message:'success login'
           });

       }else{

            res.status(200).json({
                success: true,
                message:'password is invalid'
            });

       }
        mongoose.connection.close();
        res.end();

    }catch{
        res.end();
        
    };
 
});

app.get('/', (req, res) => {
    res.status(200).sendFile( path.join(__dirname,'../../dist' , 'index.html'));
});

app.get('/live', (req, res) => {
    res.redirect(`/live/${uuid()}`)

});

app.get('/live/:room', (req, res) => {
    
    res.status(200).json( { roomId : req.params.room });
    room = req.params.room

})

// ----------- socket. -----------------------------



io.on('connection', (socket ) => {
    
    console.info(`Client connected [id=${socket.id}]`);

    socket.on('create', function(room) {
        socket.join(room);
      });

    socket.on('message', ({ username,massage,room })=>{
        socket.to(room).emit('message',{ username, massage});
    });

    socket.on('disconnect',()=>{
        console.info(`Client gone [id=${socket.id}]`);
    });

});

// ------------------------------





// ----------- server listening . -----------------------------

server.listen(port,()=>{
    console.log( ` server listening on :  ${port}` );
});