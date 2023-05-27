const asyncHandler = require('express-async-handler');
const {Inscriptions} = require('../models/Inscription');

/**-------------------------------------------------------
 * @desc lorsque l'etudiant recoit l'email de son prof qui contient un lien vers la page subscrib, lorsqu'il clique sur s'inscrire on execute cet api
 * @route /api/students/subscrib/:idclass
 * @method POST
 * @access private only student
 ---------------------------------------------------*/

 module.exports.subscribStudent = asyncHandler(async (req, res) =>{
    
   let subscrib  = await Inscriptions.findOne({etudiant:req.body.etudiant, classe:req.params.id});
    //return res.status(200).json({etudiant:req.body.etudiant, classe:req.params.id})
    if(subscrib){
        return res.status(400).json({message : "Vous étes déja inscrit"});
    }
    const Inscription = await  Inscriptions.create({
        etudiant : req.body.etudiant,
        classe : req.params.id, 
    });
    return res.status(201).json({message: "Inscription effectué dans "+Inscription.date_inscri+" avec succès"});
 });


/**-------------------------------------------------------
 * @desc pour la fonction retirer (pour annuler inscription il faut obtenir idclasse et idetudiant)
 * @route /api/students/:idetudiant/unsubscrib/:idclass/
 * @method GET
 * @access private only student
 ---------------------------------------------------*/

 module.exports.unsubscribe_Student = asyncHandler(async (req, res) =>{
   await Inscriptions.findOneAndDelete({etudiant:req.params.etudiant, classe : req.params.id});
   res.status(200).json({id:req.params.etudiant, message: "Etudiant retiré avec succès"});
   /* if(!result){
        return res.status(404).json({message: "Inscription not found"});
   }
    else{
        await Inscriptions.findByIdAndDelete(result._id);
         res.status(200).json({id:req.body.etudiant, message: "opération effectué avec succès"});
    }*/
 });
