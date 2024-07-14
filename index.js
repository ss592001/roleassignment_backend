
const express= require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const cors=require('cors');
const bodyParser=require('body-parser');

const Session=require('express-session');
const MongoDbStore=require('connect-mongodb-session')(Session);

const mongoose=require('mongoose');
const routes=require('./Routes/Routes')

const mongoUrl='mongodb://sahil1234:sahil1234@ac-9k734zt-shard-00-00.hntpn8l.mongodb.net:27017,ac-9k734zt-shard-00-01.hntpn8l.mongodb.net:27017,ac-9k734zt-shard-00-02.hntpn8l.mongodb.net:27017/?ssl=true&replicaSet=atlas-gvtm46-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const Store=new MongoDbStore({
   uri:mongoUrl,
   collection:'session',
   expiresAfterSeconds:1576800000,
  logicalSessionTimeoutMinutes:26298000, 
 });


 app.use(Session({
   secret:'My_Secret',
resave:false,
saveUninitialized:true,
store:Store
}));

app.use(bodyParser.json({ limit: '150mb' }));

app.use(cors({
   origin:['http://localhost:3001','http://localhost:3000','*'],
   credentials:true
})
);

app.use(Session({secret:'My_Secret',
   resave:false,saveUninitialized:true,
   store:Store,
   cookie:{
      maxAge:3600000*24*14,
  logicalSessionTimeoutMinutes:3600000*24*14,
}
}));

app.use(routes)


mongoose.connect(mongoUrl)
.then(result=>{
   app.listen(3008);
   console.log("connected to db and terminal at 3008");
})


  