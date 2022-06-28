const UsersModel = require('../model/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//user create Controller
exports.CreateUser = async (req, res) => {
    // const hashPassword = await bcrypt.hash(req.body.Password, 10)
    const data = {
        UserName:req.body.UserName,
        Email: req.body.Email,
        Password:req.body.Password 
    };
    UsersModel.create(data,(err, data) => {
        if(!err){
            res.status(200).json({ "Status": "Success", "data": data })
        }
        else{
            res.status(500).json({ "Status": "Fail", "data": err })
        }
    })
}

// update user
exports.Update=async(req, res)=>{
    const UserId=req.params.UserId;
        if(req.body.password){
            req.body.password = await bcrypt.hash( req.body.password, 10);
        }
        UsersModel.updateOne({UserID:UserId}, req.body, (err, data)=>{
            if(!err){
                res.status(200).json({"status":"success", "data":data})
            }
            else{
                res.status(500).json({"status":"fail", "data":err})
            }
        })
}

//read user Controller
exports.ReadUser=(req, res)=>{
    UsersModel.find((err, data)=>{
        if(!err){
            res.status(200).json({"status":"success", "data":data})
        } else{
            res.status(500).json({"status":"fail", "data":err})
        }
    })
}
//user account delete
exports.DeleteUser=(req, res)=>{
    const UserId = req.params.Userid;
        UsersModel.deleteOne({UserId:UserId}, (err, data)=>{
            if(err){
                res.status(403).json({"Status":"fail", "data":err})
            }
            else{
                res.status(200).json({"Status":"success","data":data})
            }
        })
}
//login user
exports.LoginUser = (req, res) => {
    UsersModel.find({ Email: req.body.Email }, (err, data) =>{
        if (!err && data.length > 0) {
            const payload={
                Email:data[0].Email,
                UserId:data[0].UserId
            }
            bcrypt.compare(req.body.Password, data[0].Password, (err, result) => {
                if (err) {
                    // console.log(err)
                    res.status(401).json({ status: "fail", data: "Authentication fail" })
                }
                else {
                    const token =  jwt.sign(
                        payload ,"secret123", { expiresIn: "23h" })
                        res.status(200).json({ "status": "login successfully", "token": token })
                }
            });
        }
        else {
            res.status(401).json({ status: "fail", data: "user Unauthenticated" })
        }
    })
}
