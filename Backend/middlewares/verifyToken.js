const jwt = require("jsonwebtoken");

//verify token middleware: ************************
function verifyToken(req, res, next){
    const authToken = req.headers.authorization;
    //console.log(req.headers.authorization.split(" ")[1]);
    if(authToken){
        try {
            const token = authToken.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_secret);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message:"Invalid token, access denied"});
        }
    }
    else{//401 non autorisé
        return res.status(401).json({message:"No token Provided, access denied"});
    }
}

// verify token and prof middleware : 
function verifyProfessor(req, res, next){
    verifyToken(req,res,()=>{
        if(req.user.role == "prof"){
            next();
        }
        else{
            return res.status(403).json({message:"Not allowed only professor, access denied"});
        }
    });
}

function verifyStudent(req, res, next){
    verifyToken(req,res,()=>{
        if(req.user.role == "etudiant"){
            next();
        }
        else{
            return res.status(403).json({message:"Not allowed, access denied"});
        }
    });
}

// verify token and only user himself  middleware : 
//seulement le proprietaire du profile peut modifier le profile
function verifyTokenAndUser(req, res, next){
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id){
            next();
        }
        else{
            return res.status(403).json({message:"Not allowed only User him self, access denied"});
        }
    });
}

//seulement le professeur ou bien Super admin peut avoir la liste des etudiants
function verifyProfandAdmin(req, res, next){
    verifyToken(req,res,()=>{
        if(req.user.role == "prof" || req.user.role == "admin"){
            next();
        }
        else{
            return res.status(403).json({message:"Not allowed, access denied"});
        }
    });
}

module.exports = {
    verifyToken,
    verifyProfessor,
    verifyStudent,
    verifyTokenAndUser,
    verifyProfandAdmin,
}