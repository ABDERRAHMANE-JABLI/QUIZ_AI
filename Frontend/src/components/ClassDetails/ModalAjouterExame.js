const ModalIjouterExamen = ()=>{
    return(<div id={"Add-Examen"} className="modal fade" role="dialog" tabIndex={-1}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">&nbsp; Création d'un nouvel examen</h4>
          <button
            className="btn-close"
            type="button"
            aria-label="Close"
            data-bs-dismiss="modal"
          />
        </div>
        <div className="modal-body">
          <div className="container">
            <form>
              <div className="mb-3">
                <label className="form-label form-label" htmlFor="exam-duration">
                  Titre de L'examen
                </label>
                <input
                  id="exam-duration"
                  className="form-control form-control form-control"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label form-label"
                  htmlFor="exam-description"
                >
                  Description de l'examen
                </label>
                <textarea
                  id="exam-description"
                  className="form-control form-control form-control"
                  rows={3}
                  defaultValue={""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label form-label" htmlFor="exam-duration">
                  Durée de l'examen (en minutes)
                </label>
                <input
                  id="exam-duration"
                  className="form-control form-control form-control"
                  type="number"
                  placeholder={60}
                />
              </div>
              <div className="mb-3">
                <label className="form-label form-label" htmlFor="exam-duration">
                  Nombre de question{" "}
                </label>
                <input
                  id="exam-duration"
                  className="form-control form-control form-control"
                  type="number"
                  placeholder={10}
                />
              </div>
              <div className="mb-3 form-check">
                <label className="form-label form-label" htmlFor="question-type">
                  Type de questions
                </label>
                <div className="form-check">
                  <input
                    id="flexCheckDefault"
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                  />
                  <label
                    className="form-label form-label form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {" "}
                    Choix multiples{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="flexCheckDefault"
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                  />
                  <label
                    className="form-label form-label form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {" "}
                    Choix unique{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="flexCheckDefault"
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                  />
                  <label
                    className="form-label form-label form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {" "}
                    Question normal{" "}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-light" type="button" data-bs-dismiss="modal">
            Fermer
          </button>
          <button className="btn btn-primary" type="button">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default ModalIjouterExamen;