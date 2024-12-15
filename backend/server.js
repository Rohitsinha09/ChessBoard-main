const express = require('express');
const ConnectedToDb = require("./Config/Connection");
const cors = require('cors');
const { createServer } = require('node:http');
require('dotenv').config();
const {initializeSocket} = require('./Config/Socket');
const router = require('./routes/Chess')
const PORT = 8000 || process.env.PORT;
const Mongodb_Url = process.env.MONGODB_URL;
const app = express();
const server = createServer(app);
initializeSocket(server);
app.use(cors({
    origin: "https://frontend-avzc.onrender.com",
    methods: ['GET', 'POST'],
    credentials: true
  }));

app.use('/',router);
ConnectedToDb(Mongodb_Url).then(()=>{
    console.log("Sucessfully connected to db");
    server.listen(PORT ,()=>{
        console.log('Server Started')
    })
}).catch((err)=>{
    console.log("Error While Connected to db",err);
})
