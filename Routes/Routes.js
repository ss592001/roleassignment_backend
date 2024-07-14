
const express= require('express');
const app=express();
const User=require('../Db_Schemas/User');
const Role=require('../Db_Schemas/Role');
const bcrypt = require('bcrypt');
const From =require('../Db_Schemas/Form');
const Form = require('../Db_Schemas/Form');



app.post('/signup',async(req,res,next)=>{
    const data=req.body

  const usr= await User.findOne({email:data.email});

  if(usr){
    return res.sendStatus(201);
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newuser=new User({
    email:data.email,
    password:hashedPassword,
    role:'user',
    features:['My Profile','Settings','Request Access','Manage Tasks','Completed Tasks']
  })
  await newuser.save()
  .then(result=>{
    console.log(result);
    res.json(result);
    res.sendStatus(200);
  })
  .catch(error=>{
    console.log(error);
  })

})

app.get('/login/:email/:password',async(req,res,next)=>{
    const email=req.params.email;
    const password=req.params.password;
   console.log(email);

   if(email==='superadmin@gmail.com' && password==='superadmin'){
    return res.json({auth:{
        email:'superadmin@gmail.com',
        password:'superadmin',
        role:'superadmin',
        features:['User Management','Role Management','My Profile','Settings','Request Access','Manage Tasks','Completed Tasks']

    }})
   }
    const usr= await User.findOne({email:email});
     console.log(usr);
    // if(!usr){
    //     return res.json({auth:false});
    // }

    // res.json({auth:usr});
 if(usr){
     const isMatch=bcrypt.compare(password,usr.password);
     if(isMatch){
        res.json({auth:usr});
     }
     else{
        res.json({auth:false});
     }
 }
 else{
    res.json({auth:false});
 }
})


app.post('/createroles',async(req,res,next)=>{
    const data=req.body;

    const role=await new Role({
        name:data.name,
        features:data.features
    })
   await role.save()
   .then(result=>{
    console.log(result);
    res.json(result);
    res.sendStatus(200);
   })
   .catch(error=>{
    console.log(error);
   })
})

app.post('/removerole',async(req,res,next)=>{
    const id=req.body.id;
    const role=Role.findOne({_id:id});
    role.deleteOne()
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(error=>{
        console.log(error);
    })
})

app.post('/removeuser',async(req,res,next)=>{
    const id=req.body.id;
    const user=User.findOne({_id:id});
    user.deleteOne()
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(error=>{
        console.log(error);
    })
})


app.get('/getusers',async(req,res,next)=>{
    User.find()
    .then(result=>{
        res.json(result);
        res.sendStatus(200);
    })
    .catch(error=>{
      console.log(error);
    })
})

app.post('/updaterole',async(req,res,next)=>{
    const id=req.body.id;
    const roleid=req.body.role;

    const foundrole=await Role.findOne({_id:roleid})

    const usr=await User.findOne({_id:id});
    usr.role=foundrole.name;
    usr.features=foundrole.features;
    usr.save()
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(error=>{
        console.log(result);
    })
})

app.get('/getallroles',async(req,res,next)=>{
    Role.find()
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(error=>{
        console.log(error);
    })
})




module.exports=app;