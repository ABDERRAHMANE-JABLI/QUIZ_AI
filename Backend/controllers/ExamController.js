const { func } = require('joi');
const { Answer } = require('../models/Answer');
const { Exams, validateData } = require('../models/Exam');
const { Question } = require('../models/Question');
const axios = require('axios');
require("dotenv").config();


async function CreatExamen(req,res){
    try {
        const examen = await Exams.create(req.body);
        res.status(201).json(examen);
      } catch (error) {
        res.status(500).json({ error: error });
      }
}

async function getAllExam(req,res){
    try{
        const examen = await Exams.find({}).populate('questions');
        res.status(200).json(examen);
    }catch(error){
        res.status(500).send({error : error});
    }
} 
async function getExamByClassId(req, res) {
  try {
    const exams = await Exams.find({ classe: req.params.classId });
    const count = await Exams.countDocuments({ classe: req.params.classId });

    const examsWithCount = exams.map((exam) => {
      return {
        id: exam.id,
        titre: exam.titre,
        description: exam.description,
        Date_debut:exam.Date_debut,
        Durre: exam.Durre,
        NbQuestion: count,
      };
    });

    res.status(200).json(examsWithCount);
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

async function getExamById(req,res){
    try{
        const examen = await Exams.findById(req.params.id).populate({
    path: 'questions',
    populate: {
      path: 'answers',
      model: 'Answer'
    }
  })
  .exec();

// examen.populate('questions');
        res.status(200).json(examen);
    }catch(error){
        res.status(500).send({error : error});
    }
}

async function generateQuiz(req, res) {
    try {
        const apiUrl = 'https://api.openai.com/v1/completions';
        const prompt = `génére ${req.body.NbQuestion} question sur sujet suivant "${req.body.sujet}"
          -Les questions doivent être différentes en termes de type, aux questions à réponses multiples, à réponse unique et aux questions qui nécessitent une réponse textuelle.
          -Pour les questions à choix multiples, elles doivent contenir au moins deux choix corrects.
          -Pour les questions à choix unique, elles ne doivent contenir qu'une seule réponse correcte.
          -Collectez toutes les questions dans un seul objet JSON comme suit:
          [
            {
              "id": 1,
              "questionText": "Question ?",
              "questionType": "ChoixMultiple",
              "answers": [
                {"id": 1, "text": "reponse1", "correct": false},
                {"id": 2, "text": "reponse2", "correct": true},
                {"id": 3, "text": "reponse3", "correct": true}
              ]
            },
            {
              "id": 2,
              "questionText": "Question ?",
              "questionType": "ChoixUnique",
              "answers": [
                {"id": 1, "text": "reponse1", "correct": false},
                {"id": 2, "text": "reponse2", "correct": true},
                {"id": 3, "text": "reponse3", "correct": false}
              ]
            },
            {
              "id": 3,
              "questionText": "Question ?",
              "questionType": "InputText",
              "answers": [
                {"id": 1, "text": "reponse ", "correct": false}
              ]
            },...
          ]`;
    
        const params = {
          prompt: prompt,
          temperature: 0.8,
          max_tokens: 1000,
          model: 'text-davinci-003'
        };
    
        const headers = {
          Authorization: `Bearer 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`
        };
    
        const response = await axios.post(apiUrl, params, { headers });
        const completionText = response.data.choices[0].text;
        console.log(completionText);
        // const jsonData = JSON.parse(completionText.trim());
        res.status(200).json(completionText);
  
    
        
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
      }
}

async function updateExamen(req,res){
  try {
    const exam = await Exams.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (exam) {
      res.status(200).json(exam);
    } else {
      res.status(404).json({ error: 'Examen not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Examen' });
  }
}

  
  module.exports = { generateQuiz,CreatExamen,getAllExam ,getExamById,getExamByClassId,updateExamen};
  