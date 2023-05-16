import React from 'react'
import {Sidebar, Footer, Header, Container} from '../components';
import EditerExamForm from '../ClassDetails/EditExamenForm';
import QuestionContainer from '../Questions/Question';
import { useLocation } from 'react-router-dom';


const EditerExamen = () => {
  // const location = useLocation();
  //  const jsonString = location.state.data;
  // //  alert(location.state.data);
  // //  alert(jsonString);
  //   console.log(jsonString);
  //   const jsonData = JSON.parse(jsonString);
  //   console.log(jsonData);
  const location = useLocation();
  const { jsonData } = location.state;
  const example =[
    {
      "id": 1,
      "questionText": "Quelle est la principale idée derrière la Programmation Orientée Objet (POO) ?",
      "questionType": "ChoixMultiple",
      "answers": [
        {"id": 1, "text": "Définir des classes et leurs interfaces", "correct": true},
        {"id": 2, "text": "Cacher le code de l'utilisateur final ", "correct": false},
        {"id": 3, "text": "Organiser le code en fonction des tâches à accomplir", "correct": true}
      ]
    },
    {
      "id": 2,
      "questionText": "Quel est le mot-clé utilisé en C++ pour définir une classe ?",
      "questionType": "ChoixUnique",
      "answers": [
        {"id": 1, "text": "public", "correct": false},
        {"id": 2, "text": "class", "correct": true},
        {"id": 3, "text": "interface", "correct": false}
      ]
    },
    {
      "id": 3,
      "questionText": "Quel est le nom de la fonction virtuelle qui est appelée automatiquement lorsque vous supprimez un objet de la mémoire ?",
      "questionType": "InputText",
      "answers": [
        {"id": 1, "text": "destructeur ", "correct": true},
      ]
    }
  ];

  // id, question, answers, removeQuestion
  const cards = jsonData.map(function(item){
    return <QuestionContainer id={item.id} questionText={item.questionText} answers={item.answers} questionType={item.questionType}/>
  })
  return (
    <div id="wrapper">
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header/>
          <Container>
          {/* <TextToData/> */}
            <EditerExamForm/>
            
            <div className="card" >
                  <div className="card-header">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 bd-highlight">
                        <span> select type </span>
                      </div>
                      <div className="p-2 bd-highlight">
                        <select
                          id="question_type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="" selected="">
                            Open this select menu
                          </option>
                          <option value={1}>Choix multiple</option>
                          <option value={2}>Choix unique</option>
                          <option value={3}>Input text</option>
                        </select>
                      </div>
                      <div className="p-2 bd-highlight">
                        <button className="btn btn-primary mb-3 addQuestion" type="submit">
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div id="parent-div" className="col">
                        {cards}
                      </div>
                    </div>
                  </div>
                </div>
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default EditerExamen