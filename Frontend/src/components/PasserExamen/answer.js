import React from "react";

const Answer = (props) => {
  const { text, questionType } = props;
  
  return (
    <div>     
    {
        (() => {
            switch(questionType) {
                    
                case("ChoixUnique"): {
                        return (
                            <div className="form-check">
                                    <input
                                        id="question1Choice1"
                                        className="form-check-input"
                                        type="radio"
                                        name="question1"
                                        defaultValue="choice1"
                                    />
                                    <label className="form-check-label" htmlFor="question1Choice1">
                                        {text} 
                                    </label>
                             </div>
                        )
                    }
                // break;
                    
                // eslint-disable-next-line no-lone-blocks
                case("ChoixMultiple"): {
                    return (
                        <div className="form-check">
                        <input
                          id="question2Choice1"
                          className="form-check-input"
                          type="checkbox"
                          name="question2[]"
                          defaultValue="choice1"
                        />
                        <label className="form-check-label" htmlFor="question2Choice1">
                          {text}
                        </label>
                      </div>
                    )
                }
                // break;
                
                // eslint-disable-next-line no-lone-blocks
                default: {
                        return (
                            <input
                            id="question2Choice1"
                            className="form-control"
                            type="text"
                          />
                        )
                    }
                // break;
                }
        })()  
    }  
</div>
 
  );
};

export default Answer;
  
