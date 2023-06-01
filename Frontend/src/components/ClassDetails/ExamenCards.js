import { Link } from "react-router-dom";
const ExamenCards = (props) => {
  
  const examensUrl = `/Classes/${localStorage.getItem("idClasse")}/Examens/Editer/${props.id}`;
  const voirResultUrl =  `/Classes/${localStorage.getItem("idClasse")}/ExamensResultat/${props.id}`;
  
  const truncateDescription = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const truncatedDescription = truncateDescription(props.description, 5);

  return (
    <div className="col-md-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title titreExamen">{props.titre}</h5>
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
                  <a className="dropdown-item" href={examensUrl}>
                    Editer
                  </a>
                </li>
          
                <li>
                  <a className="dropdown-item">Supprimer</a>
                </li>
                <li>
                    <Link className="dropdown-item" to={`/passer/examens/${props.id}`} target="_blank">partager lien </Link>
  
                </li>
                <li>
                  <a className="dropdown-item" href={voirResultUrl}>
                    voirs les submissions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="card-text" dangerouslySetInnerHTML={{__html: truncatedDescription}}></p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span>Nombre de Question : </span>
              <span className="font-weight-bold">{props.NbQuestion}</span>
            </li>
            <li className="list-group-item">
              <span>Date debut : </span>
              <span className="font-weight-bold">{new Date(props.Date_debut).toISOString().slice(0, 16)}</span>
            </li>
            <li className="list-group-item">
              <span>Durée: </span>
              <span className="font-weight-bold">{props.duree} minutes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExamenCards;
