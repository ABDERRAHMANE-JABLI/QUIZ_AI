const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const expressJwt = require("express-jwt");

const connectDB = require('./config/connectionDB');

//init server : 
const app = express();

//my .env file
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// routes ----------------------------------------------------------------------------
app.use("/api/auth",require('./routes/authRoute'));
app.use("/api/prof",require('./routes/Professor'));
app.use("/api/students",require('./routes/Student'));
app.use("/api/students",require('./routes/Inscription'));
app.use("/api/Classrooms",require('./routes/Classroom'));
//------------------------------------------------------------------------------------

//port server : 
const port = process.env.PORT || 5000;
connectDB();

app.listen(port,(error)=>{
    if(error) console.log("error in server");
    console.log(`server start in port ${port}`);
});
 

