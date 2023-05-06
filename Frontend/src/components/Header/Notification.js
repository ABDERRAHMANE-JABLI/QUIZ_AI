import {FaInfoCircle} from 'react-icons/fa';

const Notification = (props) => {
  return (
    <span className="dropdown-item d-flex align-items-center">
        <div className="me-3">
            <div className="icon-circle" style={{"backgroundColor":props.color}}>
                <span style={{"color":"white","fontSize":"18px"}}><FaInfoCircle/></span>
            </div>
        </div>
        <div>
            <span className="small text-gray-500">{props.date}</span>
            <p>{props.titre}</p>
        </div>
    </span>
  );
}

export default Notification