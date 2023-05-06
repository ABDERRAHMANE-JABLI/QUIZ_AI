import Dropdown from 'react-bootstrap/Dropdown';
import Img_Student from '../../image/avatar1.jpeg';

const RowStudenst = (props) => {
 return (
    <tr>
    <td>  
      <img className="rounded-circle me-2" src={props.img === "" ? Img_Student : props.img} width="30" height="30" alt="etudiants avatar"/>
    </td>
    <td>{props.FirstName}</td>
    <td>{props.LastName}</td>
    <td>{props.Email}</td>
    <td>{props.code}</td>
    <td>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="*">Reom</Dropdown.Item>
        <Dropdown.Item href="*">Another action</Dropdown.Item>
        <Dropdown.Item href="*">{props.id}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </td>
</tr>
  )
}

export default RowStudenst
