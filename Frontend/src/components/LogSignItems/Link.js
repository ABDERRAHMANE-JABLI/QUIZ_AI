import React from 'react'

const Linkbtn = (props) => {
  return (
    <div className="text-center mt-1"><a className="small" href={props.link}>{props.text}</a></div>
  )
}

export default Linkbtn