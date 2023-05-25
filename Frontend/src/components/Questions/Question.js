import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaAngleDown ,FaEdit} from "react-icons/fa";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuestionContainer = (props) => {
  const { id, questionText, questionType, AddReponse, RemoveQuestion, EditerQuestion } = props;

  const [formattedQuestionText, setFormattedQuestionText] = useState(questionText);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSaveButtonClick = () => {
    EditerQuestion(id, formattedQuestionText);
    setShowModal(false);
  };

  const handleAddAnswer = () => {
    AddReponse(id);
  };

  const handleRemoveQuestion = () => {
    RemoveQuestion(id);
  };

  const handleCollapseToggle = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
    setRotationAngle((prevAngle) => prevAngle + 180);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id={id} className="question">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <a
                  className="accordion-button"
                  data-bs-toggle="collapse"
                  href={`#collapse_${id}`}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`collapse_${id}`}
                  onClick={handleCollapseToggle}
                >
                  <FaAngleDown style={{ transform: `rotate(${rotationAngle}deg)` }} />
                </a>
              </div>
              <h5
                id="title-editor"
                className="card-title p-2 bd-highlight"
                dangerouslySetInnerHTML={{ __html: questionText }}
              ></h5>
            </div>
            <div className="p-2 bd-highlight">
              <div className="dropdown">
                <a
                  id="dropdownMenuLink"
                  className="btn btn-sm dropdown-toggle"
                  role="button"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <a className="dropdown-item" onClick={handleOpenModal}>
                      Modifier
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleRemoveQuestion}>
                      Supprimer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id={`collapse_${id}`} className="card-body collapse show">
            <ul id={`answerList_${id}`} className="list-group list-group-flush choix_Multiple">
              {props.children}
              {questionType !== "InputText" ? (
                <li className="list-group-item">
                  <button
                    className="btn btn-primary float-end addAnswer"
                    onClick={handleAddAnswer}
                    type="button"
                    data-id={`answerList_${id}`}
                  >
                    Ajouter réponse
                  </button>
                </li>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </div>
      </div>
      <hr className="mt-2 mb-3" />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            value={formattedQuestionText}
            onChange={(value) => setFormattedQuestionText(value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSaveButtonClick}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuestionContainer;
