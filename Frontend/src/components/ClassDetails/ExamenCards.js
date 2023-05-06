const ExamenCards = (props)=>{
    return(<div className="col-md-4">
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
        </div>
        <p className="card-text">{props.description}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span>Facilité: </span>
            <span className="font-weight-bold">{props.niveau}</span>
          </li>
          <li className="list-group-item">
            <span>Nombre de questions: </span>
            <span className="font-weight-bold">{props.NbQuestion}</span>
          </li>
          <li className="list-group-item">
            <span>Durée: </span>
            <span className="font-weight-bold">{props.duree} minutes</span>
          </li>
        </ul>
      </div>
    </div>
  </div>)
}
 export default ExamenCards;