const express = require('express');
const router = express.Router();
const axios = require('axios');
router.post('/', async (req, res) => {
    try {
      const apiUrl = 'https://api.openai.com/v1/completions';
      const prompt = `génére ${req.body.NbQuestion} question sur sujet suivant "${req.body.sujet}"
        -Les questions doivent être différentes en termes de type, aux questions à réponses multiples, à réponse unique et aux questions qui nécessitent une réponse textuelle.
        -Pour les questions à choix multiples, elles doivent contenir au moins deux choix corrects.
        -Pour les questions à choix unique, elles ne doivent contenir qu'une seule réponse correcte.
        -Collectez toutes les questions dans un seul objet JSON comme suit:
        [{
                questionText: "Question ?",
                questionType: "ChoixMultiple",
                answers: [
                   { text: "reponse3", correct: false,},
                    {  text: "reponse3", correct: true,},
                    {  text: "reponse3", correct: true, },
                ]
                },
                {
                  questionText: "Question ?",
                  questionType: "ChoixUnique",
                  answers: [
                    { text: "reponse3", correct: false,},
                    {  text: "reponse3", correct: true,},
                    {  text: "reponse3", correct: false , },
                  ]
                  },
                  {
                    questionText: "Question ?",
                    questionType: "InputText",
                  }]`;
  
      const params = {
        prompt: prompt,
        temperature: 0.8,
        max_tokens: 1000,
        model: 'text-davinci-003'
      };
  
      const headers = {
        Authorization: 'Bearer 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'
      };
  
      const response = await axios.post(apiUrl, params, { headers });
      const completionText = response.data.choices[0].text;
      console.log(completionText);
      res.send(completionText);

  
      
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });

  module.exports = router;