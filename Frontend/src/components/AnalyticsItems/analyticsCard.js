import React from 'react'

const HomeCard = (props) => {
  return (
    <div className="col-md-6 col-xl-3 mb-4">
        <div className="card shadow border-start-primary py-2">
            <div className="card-body">
                <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                        <div className="text-uppercase fw-bold text-xs mb-1"><span style={{color:props.color}}>{props.titre}</span></div>
                        <div className="text-dark fw-bold h5 mb-0"><span>{props.val}</span></div>
                    </div>
                    <div className="col-auto"><span style={{"color":props.color,"fontSize":"30px"}}>{props.children}</span></div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HomeCard