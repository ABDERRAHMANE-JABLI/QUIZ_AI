import {NavLink} from 'react-router-dom';

const NavigationStduentClasses = () => {
  return (
    <nav className="d-flex flex-row justify-content-center align-items-center mt-2 mb-2">
        <NavLink to={`/Classes/${localStorage.getItem("idClasse")}/Students`} style={{"marginRight":"10px"}}> Etudiants </NavLink>
        <NavLink to={`/Classes/${localStorage.getItem("idClasse")}/Examens`} style={{"marginLeft":"10px"}}> Examens </NavLink>
    </nav>
  );
}

export default NavigationStduentClasses