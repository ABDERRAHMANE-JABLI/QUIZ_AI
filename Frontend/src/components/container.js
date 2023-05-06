import React from 'react'

const Container = (props) => {
  return (
    <main className="container mt-3">
      {/* <div className="row"> */}
        {props.children}
      {/* </div> */}
    </main>
  )
}

export default Container