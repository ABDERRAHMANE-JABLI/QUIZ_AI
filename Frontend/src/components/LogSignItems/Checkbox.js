import React from 'react'

const Checkbox = () => {
  return (
    <div className="mb-3">
        <div className="custom-control custom-checkbox small">
            <div className="form-check">
                <input type="checkbox" id="formCheck-1" className="form-check-input custom-control-input"/><label className="form-label form-check-label custom-control-label" htmlFor="formCheck-1">Garder Ma Session</label>
            </div>
        </div>
    </div>
  )
}

export default Checkbox