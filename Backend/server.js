const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
//const expressJwt = require("express-jwt");

const connectDB = require('./config/connectionDB');

//init server : 
const app = express();

//my .env file
require("dotenv").config();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//cors : 
app.use(cors());
// routes ----------------------------------------------------------------------------
app.use("/api/auth",require('./routes/authRoute'));
app.use("/api/prof",require('./routes/Professor'));
app.use("/api/students",require('./routes/Student'));
app.use("/api/students",require('./routes/Inscription'));
app.use("/api/Classrooms",require('./routes/Classroom'));
app.use("/api/questions",require('./routes/QuestionRoutes'));
app.use("/api/answers",require('./routes/AnswerRoutes'));
app.use("/api/GenerateExamen",require('./routes/GenerateExamen'));




//------------------------------------------------------------------------------------

//port server : 
const port = process.env.PORT || 5000;
connectDB();

app.listen(port,(error)=>{
    if(error) console.log("error in server");
    console.log(`server start in port ${port}`);
});
 

