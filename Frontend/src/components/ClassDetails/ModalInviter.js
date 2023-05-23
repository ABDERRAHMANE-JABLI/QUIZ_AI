import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import '../../style/emailPill.css';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalInviter = () => {
  const [emailPills, setEmailPills] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const email = emailValue.trim();
      if (validateEmail(email)) {
        setEmailPills((prevPills) => [
          ...prevPills,
          { email, id: new Date().getTime() },
        ]);
        setEmailValue('');
        setInvalidEmail(false);
      } else {
        setInvalidEmail(true);
      }
    }
  };

  const handleDeleteEmail = (id) => {
    setEmailPills((prevPills) => prevPills.filter((pill) => pill.id !== id));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      const [_, domain] = email.split('@');
      if (domain === 'um5.ac.ma' || domain === 'gmail.com') {
        return true;
      }
    }
    return false;
  };

  const handleEmailValueChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleInviterClick = () => {
    // Send the emailPills array to the endpoint for sending emails
    // Replace the endpointUrl with your actual endpoint URL
    const endpointUrl = 'http://127.0.0.1:8000/api/students/inviter';
    const loadingToastId = toast.loading("Veuillez patienter pendant que nous invitons les étudiants...", { autoClose: false });


    const emailList = emailPills.map((pill) => pill.email);

    // Make the POST request to the endpoint
    // Replace 'payload' with the appropriate field name expected by the endpoint
    axios.post(endpointUrl, { "emails": emailList })
      .then((response) => {
               toast.update(loadingToastId, { render:`${response.data.message}`, type: toast.TYPE.SUCCESS, autoClose: false });

        // console.log(response.data);
      })
      .catch((error) => {
        // Handle the error if needed
        toast.update(loadingToastId, { render:`${error}`, type: toast.TYPE.SUCCESS, autoClose: false });
        console.error(error);
      });
      setTimeout(() => {
        toast.dismiss(loadingToastId);
      }, 3000);
    // for(const email of emailList){
    //   alert(email);
    // }
    document.getElementById('close-btn').click();

    // Clear the emailPills array and close the modal
    
    setEmailPills([]);
    setEmailValue('');
    setInvalidEmail(false);
    // Close the modal (you may need to add the necessary logic here)
  };

  return (
    <div
      id={'ModalInviter'}
      className="modal fade"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 id="exampleModalLabel" className="modal-title">
              Inviter des Etudiants
            </h5>
            <button
              className="btn-close"
              id='close-btn'
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Lien d'invitation</p>
            <div className="input-group mb-3">
              <input
                id="invitation-link"
                className="form-control"
                type="text"
                placeholder="www.QuizAi.com/278263bxbc"
                style={{ marginRight: 5 }}
                readOnly={true}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  <FaRegCopy />
                </button>
              </div>
            </div>
            <p>Adresses e-mail</p>
            <div id="email-list">
              {emailPills.map(({ email, id }) => (
                <div
                  className="badge bg-primary me-2 mb-2"
                  key={id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteEmail(id)}
                >
                  {email} <span>&times;</span>
                </div>
              ))}
            </div>
            <input
              id="emailValue"
              type="text"
              name=""
              className={`form-control ${invalidEmail ? 'is-invalid' : ''}`}
              value={emailValue}
              onKeyDown={handleEmailKeyDown}
              onChange={handleEmailValueChange}
            />
            {invalidEmail && (
              <div className="invalid-feedback">Invalid Email</div>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleInviterClick}
            >
              Inviter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInviter;
