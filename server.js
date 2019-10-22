const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app);
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const io = socketIO(server);
const path = require('path');
const port = 9000;
const cors = require('cors');
var session = require('express-session');
var ObjectId=require('mongodb').ObjectID;
var flash = require('connect-flash');
require('./model/db');
var cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use("/",express.static(path.join(__dirname, 'public'))); // To serve static files
 
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
let middleFunc = require('./statics/functions').middleFunc;

app.use(session({secret: "xYzUCAchitkara",resave : true,saveUninitialized : true}));


app.use('/', require('./routes'));

app.get('*',middleFunc,(req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
})





//----------------- End ----------------//

  
server.listen(port , ()=>{console.log(`Listening on Port ${port}`)})