const express = require('express')
const mongoose =require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')

const app = express();

app.use(express.json()); //This is used to passed data from frontend to server
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
}));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/Employee');

app.post('/register',(req,res)=>{

    const {name, email, password} = req.body; 
    bcrypt.hash(password,10)
        .then(hash=>{
            UserModel.create({name,email,password:hash})
            .then(user=>res.json("success"))
            .catch(err=>res.json(err))
        })
        .catch(err=>res.json(err))
})


app.post('/login',(req,res)=>{
    const {email, password} = req.body;
    UserModel.findOne({email:email})
        .then(user=>{
            if(user){ 
                bcrypt.compare(password,user.password, (err,response) =>{

                    if(response){
                        const token = jwt.sign({email:user.email},
                            "jwt-secret-key", {expiresIn:'1d'})
                        res.cookie("token",token)
                        return res.json("Login Success full")
                    }
                    else{
                        return res.json(" The password is incorrect")
                    }

                })
                    
            }
            else{
                return res.json(" No User Found")
                  }
})
})

app.listen(3001,()=>{
    console.log("Server is running on port 3001.");
})