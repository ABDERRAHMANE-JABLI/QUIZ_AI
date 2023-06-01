import React from "react";
import { FcQuestions } from 'react-icons/fc';
import { Footer } from '../HomeItems/items';
import logo from '../../image/logo_quiz2.png';
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";

const ResultoffQuiz = () => {
  const ExamId = useParams();
  const data = {
    "_id": "647883f111b55d8838453747",
    "student": {
        "_id": "645edd8de9ff32956dab8aee",
        "firstname": "ayoub",
        "lastname": "derdouri",
        "email": "ayoublodoss@gmail.com"
    },
    "exam": {
        "_id": "646979334e31b525844e92b3",
        "titre": "Alogorithmique",
        "description": "<p><strong>Notion de variable en Alogorithmique</strong></p>"
    },
    "answers": [
        {
            "question": {
                "_id": "646979334e31b525844e92bb",
                "titre": "Quelle est la fonction principale d'une variable ?",
                "note": 0,
                "type": "ChoixMultiple",
                "answers": [
                    {
                        "_id": "646979334e31b525844e92be",
                        "titre": "Stocker des valeurs",
                        "note": 0.5,
                        "correct": true
                    },
                    {
                        "_id": "646979344e31b525844e92c1",
                        "titre": "Créer des fonctions",
                        "note": 0,
                        "correct": false
                    },
                    {
                        "_id": "646979344e31b525844e92c4",
                        "titre": "Générer des algorithmes",
                        "note": 0,
                        "correct": false
                    }
                ]
            },
            "reponse": [
                {
                    "Answer": "646979344e31b525844e92c1"
                },
                {
                    "Answer": "646979344e31b525844e92c4"
                }
            ],
            "_id": "647883f111b55d8838453748"
        },
        {
            "question": {
                "_id": "646979344e31b525844e92c7",
                "titre": "Quel type de variable peut être créé dans le cadre d'un algorithme ?",
                "note": 0,
                "type": "ChoixUnique",
                "answers": [
                    {
                        "_id": "646979344e31b525844e92ca",
                        "titre": "Binaire",
                        "note": 0,
                        "correct": false
                    },
                    {
                        "_id": "646979344e31b525844e92cd",
                        "titre": "Numérique",
                        "note": 0.5,
                        "correct": true
                    },
                    {
                        "_id": "646979344e31b525844e92d0",
                        "titre": "Texte",
                        "note": 0,
                        "correct": false
                    }
                ]
            },
            "reponse": {
                "Answer": "646979344e31b525844e92cd"
            },
            "_id": "647883f111b55d8838453749"
        },
        {
            "question": {
                "_id": "646979344e31b525844e92d3",
                "titre": "Quel est l'avantage d'utiliser des variables au lieu des données statiques ?",
                "note": 0,
                "type": "InputText",
                "answers": [
                    {
                        "_id": "646979344e31b525844e92d6",
                        "titre": "",
                        "note": 1,
                        "correct": true
                    }
                ]
            },
            "reponse": {
                "text": "<h3>l'avantage d'utiliser des variables au lieu des données</h3>"
            },
            "_id": "647883f111b55d883845374a"
        },
        {
            "question": {
                "_id": "646979344e31b525844e92d9",
                "titre": "Quelle est l'utilité d'une variable ?",
                "note": 0,
                "type": "ChoixMultiple",
                "answers": [
                    {
                        "_id": "646979344e31b525844e92dc",
                        "titre": "Permettre la manipulation des données",
                        "note": 0,
                        "correct": true
                    },
                    {
                        "_id": "646979344e31b525844e92df",
                        "titre": "Stocker des valeurs",
                        "note": 0,
                        "correct": true
                    },
                    {
                        "_id": "646979344e31b525844e92e2",
                        "titre": "Créer des fonctions",
                        "note": 0,
                        "correct": false
                    }
                ]
            },
            "reponse": [
                {
                    "Answer": "646979344e31b525844e92e2"
                },
                {
                    "Answer": "646979344e31b525844e92dc"
                }
            ],
            "_id": "647883f111b55d883845374b"
        },
        {
            "question": {
                "_id": "64727f9a57fd0510852d5b04",
                "titre": "<h3>ecrire un programme qui permet d'afficher Hello world au utilisateur</h3>",
                "type": "InputText",
                "answers": [
                    {
                        "_id": "64727f9a57fd0510852d5b07",
                        "titre": "Algorithme Hello_world;  variable Test:entier;  begin          end",
                        "note": 2,
                        "correct": true
                    }
                ]
            },
            "reponse": {
                "text": "<h3>un programme qui permet d'afficher</h3>"
            },
            "_id": "647883f111b55d883845374c"
        }
    ],
    "submittedAt": "2023-06-01T11:41:37.890Z",
    "__v": 0
}

  return (
    <>
      <div className="container d-flex justify-content-center p-3">
        <img src={logo} className="logo_quiz" alt="quiz ai" width="100px" height="70px" />
      </div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <p className="infoExam"><FcQuestions />&nbsp;&nbsp;{data.student.firstname} {data.student.lastname}</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="infoExam"><FcQuestions />&nbsp;&nbsp;{data.exam.titre}</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="infoExam" dangerouslySetInnerHTML={{ __html: data.exam.description }}></p>
        </div>
        <div className="row mt-3">
                {data.answers.map((answer) => (
                <div className="card mb-4 shadow" key={answer._id}>
                    <div className="card-body">
                    <h5 className="card-title bg-gradient text-black p-2" dangerouslySetInnerHTML={{ __html: answer.question.titre }}></h5>
                    
                    {(() => {
                        switch (answer.question.type) {
                        case 'ChoixMultiple':
                            return (
                            <ul className="list-group list-group-flush">
                                {answer.question.answers.map((ans) => {
                                const isSelected = Array.isArray(answer.reponse) && answer.reponse.find((res) => res.Answer === ans._id);
                                return (
                                    <li className={`list-group-item  `} key={ans._id}> {/*${isSelected ? 'active' : ''}*/}
                                    <input type="checkbox" checked={isSelected} readOnly />
                                    {ans.titre}
                                       {ans.correct && <span className="text-success"> (Correct, Note: {ans.note})</span>}
                                       {!ans.correct && <span className="text-danger"> (InCorrect, Note: {ans.note})</span>}
                                    </li>
                                );
                                })}
                            </ul>
                            );
                        case 'ChoixUnique':
                            return (
                            <ul className="list-group list-group-flush">
                                {answer.question.answers.map((ans) => {
                                const isSelected = answer.reponse && answer.reponse.Answer === ans._id;
                                return (
                                    <li className={`list-group-item `} key={ans._id}>
                                    <input type="radio" checked={isSelected} readOnly />
                                    {ans.titre}
                                    {ans.correct && <span className="text-success"> (Correct, Note: {ans.note})</span>}
                                    {!ans.correct && <span className="text-danger"> (InCorrect, Note: {ans.note})</span>}
                                    </li>
                                );
                                })}
                            </ul>
                            );
                        default:
                            return (
                    
                            <><ReactQuill value={answer.reponse.text} readOnly />
                                <p>
                                   Réponse préférée: {answer.question.answers[0].titre}
                                </p>
                            </>
                            );
                        }
                    })()}
    </div>
  </div>
))}

        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResultoffQuiz;
