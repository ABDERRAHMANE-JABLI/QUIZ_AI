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
        Authorization: 'Bearer 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'
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
  });

  module.exports = router;