const mongoose = require("mongoose");

const InscriptionSchema = new mongoose.Schema({
    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs",
        required: true,
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes",
        required: true,
    },
    date_inscri: {
        type: Date,
        default: Date.now,
    },
});

//composite primary key :

const Inscriptions = mongoose.model("Inscriptions", InscriptionSchema);

module.exports = {
    Inscriptions,
}

