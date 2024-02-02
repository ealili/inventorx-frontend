import {Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const CustomSpinner = () => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Spinner animation="border" />
    </Container>
  );
};

export default CustomSpinner;
