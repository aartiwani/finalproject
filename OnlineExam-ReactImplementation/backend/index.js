const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const users = require("./routes/userRouter");
const questions = require("./routes/questionRouter");
dotenv.config(); // all the .env varibales;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.json());
app.use(cors()); // cross origin

app.use("/users",users);  // express userrouter;
app.use("/test",questions);  // express question router;
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`The server is running at ${PORT}`);
})