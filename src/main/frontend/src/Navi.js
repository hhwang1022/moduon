import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InstarIcon from './component/1020/InstarIcon';


const Navi = () => {
  return  (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#1020">
            <InstarIcon></InstarIcon>
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#0010">
            <InstarIcon></InstarIcon>
            </Nav.Link>
            <Nav.Link href="#9000">
                <InstarIcon></InstarIcon>
            </Nav.Link>
            <Nav.Link href="#8090">
            <InstarIcon></InstarIcon>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>);
};

export default Navi;
