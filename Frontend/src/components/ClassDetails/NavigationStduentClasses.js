import Nav from 'react-bootstrap/Nav';

const NavigationStduentClasses = () => {
  return (
    <Nav className="justify-content-center" defaultActiveKey="/students" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/students">Etudiants</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/Examens">Examens</Nav.Link>
      </Nav.Item>
    </Nav>
    
  );
}

export default NavigationStduentClasses