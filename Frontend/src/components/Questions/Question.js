import { useEffect, useState, useRef } from "react";
import {
  FaAngleDown,
  FaTrash,
  FaBold,
  FaItalic,
  FaLink,
  FaUnderline,
  FaListOl,
  FaListUl,
} from "react-icons/fa";
import axios from "axios";

const QuestionContainer = (props) => {
  const [titleToolbarVisible, setTitleToolbarVisible] = useState(false);
  const titleEditorRef = useRef(null);
  const titleDividerRef = useRef(null);
  const [formattedQuestionText, setFormattedQuestionText] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (titleEditorRef.current && !titleEditorRef.current.contains(e.target)) {
        setTitleToolbarVisible(false);
        titleDividerRef.current.style.display = "none";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTitleClick = () => {
    setTitleToolbarVisible(true);
    titleDividerRef.current.style.border = "3px solid #2E5DE4";
    titleDividerRef.current.style.display = "block";
  };

  const handleLinkButtonClick = () => {
    const url = prompt("URL", "http://");
    document.execCommand("createLink", false, url);
  };

  const handleBoldButtonClick = () => {
    document.execCommand("bold", false, null);
  };

  const handleItalicButtonClick = () => {
    document.execCommand("italic", false, null);
  };

  const handleUnderlineButtonClick = () => {
    document.execCommand("underline", false, null);
  };

  const handleUnorderedListButtonClick = () => {
    document.execCommand("insertUnorderedList", false, null);
  };

  const handleOrderedListButtonClick = () => {
    document.execCommand("insertOrderedList", false, null);
  };

 

  const { id, questionText, questionType, AddReponse, RemoveQuestion, EditerQuestion } = props;
  const handleSaveButtonClick = () => {
    EditerQuestion(id,formattedQuestionText);
};
  const handleAddAnswer = () => {
    AddReponse(id);
  };
  const handleRemoveQuestion = () => {
    RemoveQuestion(id);
  };

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
                  style={{ marginTop: "12px" }}
                >
                  <FaAngleDown style={{ marginTop: "11px" }} />
                </a>
              </div>
              <div id="edit_title" className="p-2 bd-highlight" ref={titleEditorRef} style={{ marginBottom: "1px", marginTop: "2px" }}>
                <h3
                  id="title-editor"
                  className="card-title"
                  contentEditable={true}
                  onClick={handleTitleClick}
                  onInput={(e) => setFormattedQuestionText(e.target.innerHTML)}
                  dangerouslySetInnerHTML={{ __html: questionText }}
                >
                  {/* {questionText} */}
                </h3>
                <hr className="mt-2 mb-3" ref={titleDividerRef} />
                <div id="title-toolbar" className="btn-toolbar" style={{ display: titleToolbarVisible ? "block" : "none" }}>
                  <div className="btn-group" role="group">
                    <button className="btn" onClick={handleBoldButtonClick}>
                      <FaBold />
                    </button>
                    <button className="btn" onClick={handleItalicButtonClick}>
                      <FaItalic />
                    </button>
                    <button className="btn" onClick={handleUnderlineButtonClick}>
                      <FaUnderline />
                    </button>
                    <button className="btn" onClick={handleUnorderedListButtonClick}>
                      <FaListUl />
                    </button>
                    <button className="btn" onClick={handleOrderedListButtonClick}>
                      <FaListOl />
                    </button>
                    <button className="btn" onClick={handleLinkButtonClick}>
                      <FaLink />
                    </button>
                  </div>
                  <button className="btn btn-outline-primary float-end" onClick={handleSaveButtonClick}>
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 bd-highlight">
              <a className="float-end removeQuestion" role="button" onClick={handleRemoveQuestion}>
                <FaTrash />
              </a>
            </div>
          </div>
        </div>
        <div id={`collapse_${id}`} className="card-body collapse show">
          <ul id={`answerList_${id}`} className="list-group list-group-flush choix_Multiple">
            {props.children}
            {questionType !== "InputText" ? (
              <li className="list-group-item">
                <button className="btn btn-primary float-end addAnswer" onClick={handleAddAnswer} type="button" data-id={`answerList_${id}`}>
                  Ajouter réponse
                </button>
              </li>
            ) : (
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
