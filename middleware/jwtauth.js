const jwt = require("jsonwebtoken")
function verify(req,res,next)
{
    const header = req.headers['authorization'];
    const token =  header.split(' ')[1]

    if(token==null)
    {
        res.send("authorization failed")
    }
    else{
        jwt.verify(token,process.env.SECRET_KEY,(err,token)=>{
            if(err)
            {
                res.send(err)
            }
            req.token=token;
           // console.log("token:" , req.token)

        })
        next();
    }
}

module.exports = verify;