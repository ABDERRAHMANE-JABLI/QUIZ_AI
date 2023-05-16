import Answer from "./Answer";
import {FaAngleDown ,FaTrash} from 'react-icons/fa';

const QuestionContainer = (props) => {
  const { id, questionText, answers , questionType } = props;

  const answerList = answers.map((answer) => (
    <Answer
      key={answer.id}
      id={answer.id}
      correct={answer.correct}
      score={0}
      text={answer.text}
      questionType={questionType}
    />
  ));

  return (
    <div id={id} className="question">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <a
                  data-bs-toggle="collapse"
                  href={`#collapse_${id}`}
                  role="button"
                  aria-expanded="true"
                  aria-controls={`collapse_${id}`}
                  style={{ "marginTop": "12px" }}
                >

                  <FaAngleDown style={{ marginTop: "11px" }}/>
                </a>
              </div>
              <div className="p-2 bd-highlight">
                <h3 style={{ marginBottom: "1px", marginTop: "2px" }} contentEditable>
                   {questionText}
                </h3>
              </div>
            </div>
            <div className="p-2 bd-highlight">
              <a className="float-end removeQuestion" role="button">
                  <FaTrash/>
              </a>
            </div>
          </div>
        </div>
        <div id={`collapse_${id}`} className="card-body collapse show">
          <ul id={`answerList_${id}`} className="list-group list-group-flush choix_Multiple">
            {answerList}
            {questionType !=="InputText" ? (<li className="list-group-item">
              <button className="btn btn-primary float-end addAnswer" type="button" data-id={`answerList_${id}`}>
                Ajouter réponse
              </button>
            </li>) : (
                <div></div>
            )}
            
          </ul>
        </div>
      </div>
      <hr className="mt-2 mb-3" />
    </div>
  );
};

export default QuestionContainer;
