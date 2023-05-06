const path = require("path");

const multer = require("multer");

//emplacement des photo : 
const photoStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"../images"));
    },
    filename: function(req, file, cb){
        if(file){
            cb(null, new Date().toISOString().replace(/:/g,"-")+ file.originalname);
        }
        else{
            cb(null, false);//false aucun nom pour image
        }
    }
});


//middleware photo upload :
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function(req, file, cb){
        if(file.mimetype.startsWith("image")){
            cb(null, true);
        }
        else{
            cb({message : "unsupported MIME Type"},false);
        }
    },
    limits: {fileSize: 1024 * 1024 * 5}
});

module.exports = photoUpload;