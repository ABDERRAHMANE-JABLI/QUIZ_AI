const mongoose = require("mongoose");

//check id given from client
module.exports = (req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Error : invalid id"});
    }
    next();
}