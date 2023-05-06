import React, { useState, useRef,useEffect } from 'react';
import {FaBold,FaItalic,FaLink,FaUnderline,FaListOl,FaListUl,FaPalette} from 'react-icons/fa';
import $ from 'jquery';

const EditerExamForm = (props)=> {
  const [titleToolbarVisible, setTitleToolbarVisible] = useState(false);
  const [descToolbarVisible, setDescToolbarVisible] = useState(false);
  const titleEditorRef = useRef(null);
  const descEditorRef = useRef(null);
  const titleDividerRef = useRef(null);
  const descDividerRef = useRef(null);
  const selectionRef = useRef(null);
  const colorInputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (titleEditorRef.current && !titleEditorRef.current.contains(e.target)) {
        setTitleToolbarVisible(false);
        titleDividerRef.current.style.display = 'none';
      }
      if (descEditorRef.current && !descEditorRef.current.contains(e.target)) {
        setDescToolbarVisible(false);
        descDividerRef.current.style.display = 'none';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleColorButtonClick = () => {
    colorInputRef.current.click();
  };
  
  const handleColorChange = () => {
    const color = colorInputRef.current.value;
    document.execCommand("foreColor", false, color);
  };
  
  const handleTitleClick = () => {
    setTitleToolbarVisible(true);
    titleDividerRef.current.style.border = '3px solid #2E5DE4';
    titleDividerRef.current.style.display = 'block';
  };

  const handleDescClick = () => {
    setDescToolbarVisible(true);
    descDividerRef.current.style.border = '3px solid #2E5DE4';
    descDividerRef.current.style.display = 'block';
  };

  

  const handleLinkButtonClick = () => {
   const url =prompt('url','http//:');
    document.execCommand('createLink', false, url);
  };

  

  const handleBoldButtonClick = () => {
    document.execCommand('bold', false, null);
  };

  const handleItalicButtonClick = () => {
    document.execCommand('italic', false, null);
  };

  const handleUnderlineButtonClick = () => {
    document.execCommand('underline', false, null);
  };

  const handleUnorderedListButtonClick = () => {
    document.execCommand('insertUnorderedList', false, null);
  };

  const handleOrderedListButtonClick = () => {
    document.execCommand('insertOrderedList', false, null);
  };

  return (
    <div style={{ marginBottom: 8}}>
      <div className="card" >
        <div className="card-body">
          <div id="edit_title" ref={titleEditorRef}>
            <h3
              id="title-editor"
              className="card-title"
              contentEditable={true}
              onClick={handleTitleClick}
              
            >
              Titre de L'Examen
            </h3>
            <hr className="mt-2 mb-3" ref={titleDividerRef} />
            <div id="title-toolbar" className="btn-toolbar" style={{display: titleToolbarVisible ? 'block' : 'none'}}>
              <div className="btn-group" role="group">
                <button className="btn" onClick={handleBoldButtonClick}>
                  <FaBold/>
                </button>
                <button className="btn" onClick={handleItalicButtonClick}>
                 <FaItalic/>
                </button>
                <button className="btn" onClick={handleUnderlineButtonClick}>
                <FaUnderline/>
                </button>
                <button className="btn" onClick={handleUnorderedListButtonClick}>
                 <FaListUl/>
                </button>
                <button className="btn" onClick={handleOrderedListButtonClick}>
                 <FaListOl/>
                </button>
                <button className="btn" onClick={handleLinkButtonClick}>
                  <FaLink/>
                </button>

              </div>
              </div>
            </div>
              <div id="edit_desc" ref={descEditorRef}>
            <p
              id="desc-editor"
              contentEditable={true}
              onClick={handleDescClick}
              
            >
              Description de l'examen
            </p>
            <hr className="mt-2 mb-3" ref={descDividerRef} />
            <div id="desc-toolbar" className="btn-toolbar" style={{display: descToolbarVisible ? 'block' : 'none'}}>
            <div className="btn-group" role="group">
                <button className="btn" onClick={handleBoldButtonClick}>
                  <FaBold/>
                </button>
                <button className="btn" onClick={handleItalicButtonClick}>
                 <FaItalic/>
                </button>
                <button className="btn" onClick={handleUnderlineButtonClick}>
                <FaUnderline/>
                </button>
                <button className="btn" onClick={handleUnorderedListButtonClick}>
                 <FaListUl/>
                </button>
                <button className="btn" onClick={handleOrderedListButtonClick}>
                 <FaListOl/>
                </button>
                <button className="btn" onClick={handleLinkButtonClick}>
                  <FaLink/>
                </button>
                <button className="btn" onClick={handleColorButtonClick}>
                <FaPalette />
              </button>
          <input
                    type="color"
                    style={{ display: "none" }}
                    ref={colorInputRef}
                    onChange={handleColorChange}
                  />


              </div>
            </div>
          </div>

          </div>
          
        </div>
        
      </div>
      
      );
}

export default EditerExamForm;






