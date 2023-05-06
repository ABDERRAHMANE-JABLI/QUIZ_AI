const Input = (props) => {
  return (
    <div className="col-12">
        <div className="mb-3">
            <label className="form-label" htmlFor={props.id}><strong>{props.label}</strong></label>
            <input className="form-control" type={props.type} id={props.id} placeholder={props.placeholder} name={props.id}/>
        </div>
    </div>
  );
}

export default Input