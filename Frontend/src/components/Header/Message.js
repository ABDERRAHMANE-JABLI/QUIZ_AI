import React from 'react'
import transmitter from '../../image/avatar1.jpeg';

const Message = (props) => {
  return (
    <span className="dropdown-item d-flex align-items-center">
        <div className="dropdown-list-image me-3">
          <img className="rounded-circle" src={transmitter} alt={`émetteur ${props.transmitter}`}/>
          <div className="bg-success status-indicator"></div>
        </div>
        <div className="fw-bold">
            <div className="text-truncate"><span>{props.msg}</span></div>
            <p className="small text-gray-500 mb-0">{props.transmitter}</p>
        </div>
    </span>
  )
}

export default Message