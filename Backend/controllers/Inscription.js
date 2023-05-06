const asyncHandler = require('express-async-handler');
const {Inscriptions} = require('../models/Inscription');

/**-------------------------------------------------------
 * @desc lorsque l'etudiant recoit l'email de son prof qui contient un lien ,lorsqu'il clique sur s'inscrire on execute cet api
 * @route /api/students/subscrib/:idclass
 * @method GET
 * @access private only student
 ---------------------------------------------------*/
 module.exports.SubscribStudent = asyncHandler(async (req, res) =>{
    const Inscription = await  Inscriptions.create({
        etudiant : req.user.id,
        classe : req.params.id, 
    });
    res.status(201).json(Inscription);
 });


 
/**-------------------------------------------------------
 * @desc pour la fonction retirer 
 * @route /api/students/subscrib/:idclass
 * @method GET
 * @access private only student
 ---------------------------------------------------*/

 module.exports.unsubscribe_Student = asyncHandler(async (req, res) =>{
   const result = await Inscriptions.find({etudiant : req.user.id, classe : req.params.id});
   if(!result){
        return res.status(404).json({message: "not found"});
    }
    else{
        await Inscriptions.findByIdAndDelete(result._id);
    }
 });
