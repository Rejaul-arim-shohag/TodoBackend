var jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, "secret123", (err, decode)=>{
        if(err){
            console.log(err)
            res.status(401).json({"status":"Fail", "data":"json web token error"});
        }
        else{
            const email = decode.Email;
            const UserId = decode.UserId;
            console.log(decode)
            req.body.Email = email;
            req.body.UserId = UserId;
            next();
        }
    })
}

//https://themexbd.com/poket/autocar/