const ExamenInfoCard = (props)=>{
    return(
            <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{props.titre}</h5>
                <p className="card-text">{props.description}</p>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span>Facilité: </span>
                    <span className="font-weight-bold">{props.niveau}</span>
                </li>
                <li className="list-group-item">
                    <span>Nombre de questions: </span>
                    <span className="font-weight-bold">{props.nbQuestion}</span>
                </li>
                <li className="list-group-item">
                    <span>Durée: </span>
                    <span className="font-weight-bold">{props.duree} minutes</span>
                </li>
                </ul>
            </div>
            </div>
    )
}

export default ExamenInfoCard