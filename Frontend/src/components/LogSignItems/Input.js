import React from 'react'

const Input = (props) => {
  return (
    <div className="mb-3">
        <input className="form-control form-control-user" type={props.type} id={props.id}  placeholder={props.placeholder} name={props.id}/>
    </div>
  )
}

export default Input