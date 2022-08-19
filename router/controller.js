const user = require("../models/user.js");
const task = require("../models/task.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()

// user registration
const register = async (req,res)=>{
   // console.log("inside controller")
        let data={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        let email= await user.findOne({where:{email:req.body.email}})
        if(email)
        {
            res.status(400).send('email already registered please sign up with another email');
        }
        else
        {
        const hash=bcrypt.hashSync(req.body.password,12)
        data.password=hash;
       // console.log(data)
        user.create(data)
        .then(()=>{res.status(200).send('User registered successfullt registered')})
        .catch((err)=>res.send(err))
        }
}

//user login
const login = async (req,res)=>{
    user.findOne({where:{email:req.body.email}})
    .then(async (user)=>{
        let passwordhash=user.password
        let password=req.body.password
        const match = await bcrypt.compare(password,passwordhash)
        //console.log(match)
        if(match)
        {
            let data = {id:user.id,email:req.body.email}
            console.log(process.env.SECRET_KEY)
            const accesstoken = jwt.sign({data:data},process.env.SECRET_KEY,{expiresIn:'600s'})
           
            res.json({"accessToken":accesstoken});
        }
        else
        {
            res.status(401).send('Wrong password')
        }
    })
    .catch((err)=>res.send(err))
}


// create new task **** faced issue related to postman so using manual data *****
const createTask = (req,res,next)=>{
    let user = req.token.data
    //console.log(user.id)
    let file = req.files.file;
    //console.log(req.files)
    let filedata = file.data.toString("base64");
    let data ={
        title : "sampletask21",
        due_date : "22-8-2022",
        file : filedata,
        user : user.id
      }
    
    task.create(data)
    .then(()=>{
        res.status(201).send("Task created successfully");
    })
    .catch((err)=>{ res.status(400).send(err)})
   //res.send(filedata);
}

// get all task list of logged in user
const tasklist = (req,res)=>{
    let user = req.token.data
    task.findAll(
        {
            where:{
                     user:user.id
                  } 
       })
       .then((data)=>{res.status(200).send(data)})
       .catch((err)=>{res.status(401).send(err)})
}

const updatetask = (req,res)=>{
    task.update(req.body,{where:{id:req.params.id}})
    .then(()=>{res.send("task updated")})
    .catch((err)=>{res.send(err)})
}

const taskdelete = (req,res)=>{
    task.destroy({where:{id:req.params.id}})
    .then(()=>{res.send("task deleted successfully")})
    .catch((err)=>{res.send(err)})
}


module.exports = {register,login,createTask,tasklist,updatetask,taskdelete}