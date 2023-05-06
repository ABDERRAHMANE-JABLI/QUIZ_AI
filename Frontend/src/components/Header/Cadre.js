import React from 'react'

const Cadre = (props) => {
  return (
        <li className="nav-item dropdown no-arrow mx-1">
          <div className="nav-item dropdown no-arrow">
              <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="/">
                <span className="badge bg-danger badge-counter">{props.count}+</span><span style={{"fontSize": "20px","color":"rgb(41, 47, 84)"}}>{props.icon}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">{props.titre}</h6>
                  {props.children}
                  <a className="dropdown-item text-center small text-gray-500" href="/profile">Afficher Tout</a>
              </div>
          </div>
        </li>
  )
}

export default Cadre