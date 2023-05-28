import React from 'react';
import { FaTimesCircle,FaEdit} from 'react-icons/fa';

const Answer = (props) => {
  const { id, correct, score, text, questionType, onDeleteAnswer ,EditerAnswer } = props;
  const handleEditerAnswer=()=>{
    EditerAnswer(id);
  }
  const handleDeleteAnswer = () => {
    onDeleteAnswer(id); // Call the onDeleteAnswer function with the answer id
  };
  
  return (
    <div>     
    {
        (() => {
            switch(questionType) {
                    
                case("ChoixUnique"): {
                        return (
                      <li id={id} className="list-group-item" >
                          <div className="d-flex justify-content-between">
                            <div className="p-2 bd-highlight">
                                <div className="form-check">
                                  <input
                                    id={`answer_${id}`}
                                    className="form-check-input"
                                    type="radio"
                                    name="answer"
                                    value=""
                                  />
                                  <label
                                  className="form-label form-check-label"
                                  htmlFor={`answer_${id}`}
                                >
                                  {text}
                                </label>
                                </div>
                            </div>
                                <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                   <div className="form-check">
                                     <label
                                       className="form-label form-label form-check-label" htmlFor={`answer_${id}`}>Correct</label>
                                     <input
                                       id={`correct_${id}`}
                                       className="form-check-input"
                                       type="checkbox"
                                       checked={correct}
                                       disabled
                                     />
                                   </div>
                                 </div>
                                 <div className="p-2 bd-highlight">
                                   <input
                                     id={`score_${id}`}
                                     className="form-control-sm form-control"
                                     type="number"
                                     data-bs-toggle="tooltip"
                                     name="score[]"
                                     step="0.1"
                                     style={{ width: "70px", marginTop: "-3px" }}
                                     title="la note obtenu"
                                     value={score}
                                     readOnly
                                   />
                                 </div>
                                 <div className="p-2 bd-highlight">
                                   <span className="me-2">pt</span>
                                 </div>
                                 <div className="p-2 bd-highlight">
                                   <a className="removeAnswer" role="button" onClick={handleDeleteAnswer}>
                                     <FaTimesCircle/>
                                   </a>
                                 </div>
                                 <div className="p-2 bd-highlight">
                               <a className="removeAnswer" role="button" onClick={handleEditerAnswer}>
                                 <FaEdit/>
                               </a>
                             </div>
                               </div>
                          </div>
                        </li>
                        )
                    }
                break;
                    
                // eslint-disable-next-line no-lone-blocks
                case("ChoixMultiple"): {
                    return (
                      <li id={id} className="list-group-item" >
                      <div className="d-flex justify-content-between">
                        <div className="p-2 bd-highlight">
                             <div className="form-check">
                             <input
                                id={`answer_${id}`}
                                className="form-check-input"
                                type="checkbox"
                                value=""
                              />
                              <label
                              className="form-label form-check-label"
                              htmlFor={`answer_${id}`}
                            >
                              {text}
                            </label>
                            </div>
                        </div>
                            <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 bd-highlight">
                               <div className="form-check">
                                 <label
                                   className="form-label form-label form-check-label"
                                   htmlFor={`answer_${id}`}
                                 >
                                   Correct
                                 </label>
                                 <input
                                   id={`correct_${id}`}
                                   className="form-check-input"
                                   type="checkbox"
                                   checked={correct}
                                   disabled
                                 />
                               </div>
                             </div>
                             <div className="p-2 bd-highlight">
                               <input
                                 id={`score_${id}`}
                                 className="form-control-sm form-control"
                                 type="number"
                                 data-bs-toggle="tooltip"
                                 name="score[]"
                                 step="0.1"
                                 style={{ width: "70px", marginTop: "-3px" }}
                                 title="la note obtenu"
                                 value={score}
                                 readOnly
                               />
                             </div>
                             <div className="p-2 bd-highlight">
                               <span className="me-2">pt</span>
                             </div>
                             <div className="p-2 bd-highlight">
                               <a className="removeAnswer" role="button" onClick={handleDeleteAnswer}>
                                 <FaTimesCircle/>
                               </a>
                             </div>
                             <div className="p-2 bd-highlight">
                               <a className="removeAnswer" role="button" onClick={handleEditerAnswer}>
                                 <FaEdit/>
                               </a>
                             </div>
                           </div>
                      </div>
                    </li>
                    )
                }
                break;
                
                // eslint-disable-next-line no-lone-blocks
                default: {
                        return (
                          <li id={id} className="list-group-item">
                            <div className="input-group">
                                  <input type="text" className="form-control"  value={text} />
                                  <input type="number" className="input-group-text"
                                  id={`score_${id}`}
                                  name="score[]"
                                  step="0.1"
                                  value={score}
                                  />
                                  <span className="input-group-text"><a className="removeAnswer" role="button" onClick={handleEditerAnswer}>
                                 <FaEdit/>
                               </a></span>
                          </div>
                       </li>
                        )
                    }
                break;
                }
        })()  
    }  
</div>
 
  );
};

export default Answer;
  
