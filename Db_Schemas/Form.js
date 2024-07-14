
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const Form=new Schema({
 name:{
    type:String
 },
email:{
    type:String
},
password:{
    type:String
},
roll:{
    type:String
},
mobile:{
    type:String
}

   })
module.exports=mongoose.model('Form',Form);