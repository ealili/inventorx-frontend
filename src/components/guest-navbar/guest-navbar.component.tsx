import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Form, Nav} from "react-bootstrap";
import LanguageSwitcher from "../language-switcher/language-switcher.component.tsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

interface GuestNavbarProps  {
  component: string
}
const GuestNavbar = (props: GuestNavbarProps) => {
  const {t} = useTranslation()

  return (
    <Navbar expand="lg" className="bg-body-tertiary p-4" style={{zIndex: 1000}}
    >
      <Container fluid={'sm'}>
        <Navbar.Brand href="/">
          <h2>InventorX</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll" className={'text-center'}>
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{maxHeight: '50%'}}
            navbarScroll
          >
          </Nav>
          <hr/>
          {
            props.component === 'landing' && (      <Form className="d-flex">
              <p className={'my-auto mx-auto mx-lg-2 my-auto'}>{t('alreadyRegistered')}</p>
              <Link className={'mx-auto my-auto'} to={'/login'}> {t('loginButton')}</Link>
            </Form>)
          }
          <hr/>
          <div className={'d-flex mx-lg-5 justify-content-center'}>
            <LanguageSwitcher/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default GuestNavbar