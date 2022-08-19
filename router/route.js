const express = require("express");
const router = express.Router();
const jwtauth = require("../middleware/jwtauth.js")
const {register, login, createTask, tasklist, updatetask,taskdelete} = require("./controller.js")

router.get("/hello",(req,res)=>{
    res.send("hello brother")
})


router.post('/register',register);

router.post("/login",login)

router.post("/newtask",jwtauth,createTask)

router.get("/tasklist",jwtauth,tasklist)

router.put("/task/update/:id",jwtauth,updatetask)

router.delete("/task/remove/:id",jwtauth,taskdelete)

module.exports = router;