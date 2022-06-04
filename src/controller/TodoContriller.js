const TodoModel = require("../model/TodoModel");
//create
exports.CreateTodo = (req, res) => {
    console.log(req.body)
    const reqBody = {
        Title: req.body.Title,
        Detail: req.body.Detail,
        UserId: req.body.UserId,
    };
    TodoModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.UpdateTodo = (req, res) => {
    const id = req.params.id;
    TodoModel.updateOne({_id:id},req.body, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.DeleteTodo = (req, res) => {
    const id = req.params.id;
    console.log(id)
    TodoModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}


// for exact user todo
exports.ReadTodoByUserId= (req, res) => {
    console.log(req)
    TodoModel.find({ UserId: req.body.UserId }, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

//this is For Admin
exports.ReadTodoById = (req, res) => {
    const id=req.params.id
    TodoModel.find({_id:id},(err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}