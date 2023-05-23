import React, { useEffect, useState } from 'react';
import { Sidebar, Footer, Header, Container } from '../components';
import EditerExamForm from '../ClassDetails/EditExamenForm';
import QuestionContainer from '../Questions/Question';
import { useLocation } from 'react-router-dom';
import {toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Answer from '../Questions/Answer'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../style/ButtonAjouter.css'
import { useParams } from 'react-router-dom';





const EditerExamen = () => {
  // const location = useLocation();
  // const { Examen } = location.state;
  const { ExamId } = useParams();
  const ExamsId =ExamId;

  const endPoint = `http://localhost:8000/api/questions/${ExamId}/questions`;

  {/*handle necessery event for editer modals */}
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
 const [response, setResponse] = useState('');
 const [Id,setId]=useState('');
 const [note, setNote] = useState(0);
 const [correct, setCorrect] = useState(false);
 const handleIdChange =(event)=>{
     setId(event.target.value);
 }
 const handleResponseChange = (event) => {
  setResponse(event.target.value);
};

const handleNoteChange = (event) => {
  setNote(parseFloat(event.target.value));
};

const handleCorrectChange = (event) => {
  setCorrect(event.target.checked);
}; 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(endPoint)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeleteAnswer = (answerId) => {
    fetch(`http://localhost:8000/api/answers/${answerId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Answer deleted successfully
          // Fetch the updated data
          toast.success("Answer Deletd with success");
          fetchData();
        } else {
          // Handle error response
          toast.error("Error");

          throw new Error('Failed to delete answer');
        }
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };
  const handleEditAnswer = (answerId ) => {
    fetch(`http://localhost:8000/api/answers/${answerId}`)
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the JSON response
      } else {
        throw new Error('Failed to fetch answer');
      }
    })
    .then(data => {
      // Update the state variables with the response data
      setId(data._id);
      setCorrect(data.correct);
      setResponse(data.titre);
      setNote(data.note);
      setShow(true);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  };

  const handleSubmitAnswer = (event) => {
    event.preventDefault();
  
    // Create the updated answer object
    const updatedAnswer = {
      titre: response,
      note: note,
      correct: correct
    };
  
    // Make the PUT request to the API endpoint
    fetch(`http://localhost:8000/api/answers/${Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAnswer)
    })
      .then(response => {
        if (response.ok) {
          // Handle successful response
          // e.g., show a success message, update the state, etc.
          toast.success("Answer modified with success");
          fetchData();
          setShow(false);
        } else {
          // Handle error response
          // e.g., show an error message, handle validation errors, etc.
          toast.success("Error");
        }
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };
  const handleAddReponse = (QuestionId) => {
    const newAnswer = {
      titre: "__blank",
      note: 0,
      correct: false,
      question: QuestionId
    };
  
    fetch('http://localhost:8000/api/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnswer)
    })
      .then(response => {
        if (response.ok) {
          // Handle successful response
          // e.g., show a success message, update the state, etc.
          toast.success("Answer created with success");
          fetchData();
        } else {
          // Handle error 
          toast.error(response.data.error);
          
          // e.g., show an error message, handle validation errors, etc.
        }
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  {/*handle event Add Questions */}
  const [questionType, setQuestionType] = useState('');

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve form input values
     // Replace with the actual exam ID

    // Construct the request body
    const data = {
      titre:"__blank Question",
      type: questionType,
      Exam: ExamsId,
    };

    // Send the POST request to the endpoint
    fetch('http://localhost:8000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., display a success message
          toast.success("Question added successfully");
          fetchData();
        } else {
          // Handle error response
          toast.error('Failed to add question');
        }
      })
      .catch((error) => {
        // Handle network error or other exceptions
        console.error(error);
      });
  };


  {/*end handle event Add Question*/}

  {/*handle delete Question*/}
  const handleDeleteQuestion = (QuestionId) => {
    fetch(`http://localhost:8000/api/questions/${QuestionId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Question deleted successfully
          // Perform any additional actions or update UI as needed
          toast.success('Question deleted successfully');
          fetchData();
        } else {
          // Handle error response
          toast.error('Failed to delete question');
        }
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };
  
  {/*end handle delete Question */}

   {/*handle Editer title off Question*/}
   const handleEditerQuestion = (QuestionId,formattedQuestionText) => {
    const data = {
      titre:formattedQuestionText,
    };

    // Send the POST request to the endpoint
    fetch(`http://localhost:8000/api/questions/${QuestionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., display a success message
          toast.success("Question Updated successfully");
          fetchData();
        } else {
          // Handle error response
          toast.error('Failed to Update question');
        }
      })
      .catch((error) => {
        // Handle network error or other exceptions
        console.error(error);
      });
  };
  
  {/*end handle Editer title off Question*/}

  

  const cards = data.map(function (item) {
    return (
      <QuestionContainer
        id={item._id}
        questionText={item.titre}
        // answers={item.answers}
        questionType={item.type}
        AddReponse={handleAddReponse}
        RemoveQuestion={handleDeleteQuestion}
        EditerQuestion={handleEditerQuestion}
      >
        {/* Render the Answer component within QuestionContainer */}
        {item.answers.map(answer => (
          <Answer
            key={answer._id}
            id={answer._id}
            correct={answer.correct}
            score={answer.note}
            text={answer.titre}
            questionType={item.type}
            onDeleteAnswer={handleDeleteAnswer} 
            EditerAnswer={handleEditAnswer}// Pass the delete function as a prop
          />
        ))}
      </QuestionContainer>
    );
  });

  return (
    <div id="wrapper">
  <Sidebar />
  <div className="d-flex flex-column" id="content-wrapper">
    <div id="content">
      <Header />
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <EditerExamForm id={ExamsId} titre={"Examen.titre"} description={"Examen.description"} />

        <div className="card">
          <div className="card-header">
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between">
                <div className="p-2 bd-highlight">
                  <span>select type</span>
                </div>
                <div className="p-2 bd-highlight">
                  <select
                    id="question_type"
                    className="form-select"
                    aria-label="Default select example"
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                  >
                    <option value="">Open this select menu</option>
                    <option value="ChoixUnique">Choix unique</option>
                    <option value="ChoixMultiple">Choix multiple</option>
                    <option value="InputText">Input text</option>
                  </select>
                </div>
                <div className="p-2 bd-highlight">
                  <button className="btn btn-primary mb-3 addQuestion" type="submit">
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-body">
            <div className="row">
              <div id="parent-div" className="col">
                {cards}
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown circle-button">
              <button
                className="btn btn-primary mb-3 addQuestion "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                +
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
        {/* <div className="circle-button">
          <button className="btn btn-primary mb-3 addQuestion">+</button>

        </div> */}

        {/* editer answer modal */}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editer Response</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmitAnswer}>
            <Modal.Body>
              <Form.Control type="hidden" value={Id} onChange={handleIdChange} />
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Response</Form.Label>
                <Form.Control type="text" value={response} onChange={handleResponseChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Note</Form.Label>
                <Form.Control type="number" min={0} value={note} onChange={handleNoteChange} />
              </Form.Group>
              <Form.Check
                type="checkbox"
                id={`correct`}
                label={`Correct`}
                checked={correct}
                onChange={handleCorrectChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button variant="primary" type="submit">
                Enregister
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* editer Question Modal */}
      </Container>
    </div>
    <Footer />
  </div>
</div>

  );
};

export default EditerExamen;
            
