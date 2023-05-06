import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import  '../../style/emailPill.css';


const ModalInviter = () => {
  const [emailPills, setEmailPills] = useState([]);

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const email = event.target.value.trim();
      if (validateEmail(email)) {
        setEmailPills((prevPills) => [
          ...prevPills,
          { email, id: new Date().getTime() },
        ]);
        event.target.value = '';
        document.getElementById('emailValue').classList.remove('is-invalid');

      } else {
        document.getElementById('emailValue').classList.add('is-invalid');
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
      if (domain === 'um5.ac.ma') {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      id={"ModalInviter"}
      className="modal fade"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 id="exampleModalLabel" className="modal-title">
              Inviter Membres
            </h5>
            <button
              className="btn-close"
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
                readOnly="true"
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
              className='form-control'
              onKeyDown={handleEmailKeyDown}
            />
            <div className="invalid-feedback">
                Invalid Email
                </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
            <button className="btn btn-primary" type="button">
              Inviter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInviter;
