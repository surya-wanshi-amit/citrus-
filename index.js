const express = require("express");
const database = require("./dbconnection/database.js")
const router = require("./router/route.js");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());
app.use(fileUpload())


app.use("/",router)

app.listen(3000,()=>{ console.log("app listning on port 3000")})
