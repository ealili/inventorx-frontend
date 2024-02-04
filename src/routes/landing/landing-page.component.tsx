import Container from 'react-bootstrap/Container';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {Col, Form, Row} from "react-bootstrap";
import macbookWorkingHours from '../../assets/macbook-pro-working-hours-min.png'
import imacDashboard from '../../assets/imac-working-hours-min.png'
import './landing.styles.scss'
import React, {useEffect, useState} from "react";
import {sendContactDetails} from "../../services/ContactService.ts";
import {ContactPayload} from "../../types/contact.ts";
import {notify} from "../../store/notification/notificationSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {
  selectNotification,
  selectNotificationType
} from "../../store/notification/notification.selector.ts";
import {selectToken} from "../../store/user/user.selector.ts";
import {useTranslation} from "react-i18next";
import GuestNavbar from "../../components/guest-navbar/guest-navbar.component.tsx";
import iphoneDashboard from '../../assets/iphone-dashboard.png'
import iphoneWorkingHours from '../../assets/iphone-working-hours.png'


// TODO: REFACTOR, CODE CLEANUP, STYLE DIVS WITH STYLED COMPONENTS

function LandingPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState('')
  const [textArea, setTextArea] = useState('')
  const notification = useSelector(selectNotification);
  const notificationType = useSelector(selectNotificationType)
  const token = useSelector(selectToken);
  const {t} = useTranslation();

  const notificationStyle = {
    backgroundColor: notificationType === 'success' ? '#00a762' : 'red'
  };

  const [isFirstRowVisible, setFirstRowVisible] = useState(false);
  const [isSecondRowVisible, setSecondRowVisible] = useState(false);
  const [isThirdRowVisible, setThirdRowVisible] = useState(false);


  const handleScroll = () => {
    const firstRow = document.getElementById("first-row");
    const secondRow = document.getElementById("second-row");
    const thirdRow = document.getElementById("third-row");

    const windowHeight = window.innerHeight;

    if (firstRow && window.scrollY + window.innerHeight >= firstRow.offsetTop) {
      setFirstRowVisible(true);
    }

    if (secondRow && window.scrollY + windowHeight * 0.5 >= secondRow.offsetTop) {
      setSecondRowVisible(true);
    }

    if (thirdRow && window.scrollY + windowHeight * 0.5 >= thirdRow.offsetTop) {
      setThirdRowVisible(true);
    }
  };

  useEffect(() => {
    handleScroll(); // Call handleScroll once when the component mounts

    const handleResize = () => {
      // Recalculate visibility on window resize
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (token) {
    return <Navigate to={"/dashboard"}/>;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload: ContactPayload = {
        email,
        text: textArea
      };
      await sendContactDetails(payload);
    } catch (err) {
      dispatch(notify({
        message: "Something went wrong! Please try again later!",
        type: 'error'
      }));
      console.log(err)
    }
  }

  return (
    <>
      <GuestNavbar component={'landing'}/>
      <Container fluid>
        <Row id="first-row"
             className={`transition-fade ${isFirstRowVisible ? "fade-in" : ""}`}>
          {/* Left Column - Image */}
          <Col xs={12} md={8} className="first-row-images">
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={imacDashboard}
                alt=""
                className="img-fluid "
                style={{
                  maxWidth: '55%',
                  height: 'auto',
                  position: 'absolute',
                  transform: 'rotate(0deg)',
                }}
              />
              <img
                src={macbookWorkingHours}
                alt=""
                className="img-fluid"
                style={{
                  maxWidth: '50%',
                  height: 'auto',
                  position: 'absolute',
                  left: '35%',
                  transform: 'rotate(0deg)',
                }}
              />
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
                 className={'first-section-heading'}>
              <h1>InventorX</h1>
              <br/>
              <h2 className={'text-center'}>{t('firstSectionHeading')}</h2>
              <br/><br/>
              <h3 className={'text-center'}>{t('Register Your Team Now!')}</h3>
              <br/>
              <button className={'team-register-button'} onClick={() => navigate('register')}>
                {t('register')}
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row
          id="second-row"
          className={`transition-fade ${isSecondRowVisible ? "fade-in" : ""}`}
        >
          <Col xs={12} md={8}>
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
                 className={'second-row-images'}
            >
              <img
                id={'second-row-first-image'}
                src={iphoneDashboard}
                alt=""
                style={{
                  maxWidth: 'auto',
                  height: '50%',
                  position: 'absolute',
                  left: '21%',
                }}
              />
              <img
                id={'second-row-second-image'}
                src={iphoneWorkingHours}
                alt=""
                className="img-fluid"
                style={{
                  maxWidth: 'auto',
                  height: '50%',
                  position: 'absolute',
                  // left: '25%',
                }}
              />
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}>
              <h1>{t('responsive')}</h1>
              <br/>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Reviews Section */}
      {/*<Container>*/}
      {/*  <Row*/}
      {/*    id="third-row"*/}
      {/*    className={`transition-fade ${isThirdRowVisible ? "fade-in" : ""}`}*/}
      {/*  >*/}
      {/*    <Reviews/>*/}
      {/*  </Row>*/}
      {/*</Container>*/}

      <Container fluid>
        <Row
          id="third-row"
          className={`transition-fade ${isThirdRowVisible ? "fade-in" : ""}`}
        >
          <Col xs={12} md={6}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }} className={'demo-section'}>
              <h1>{t('scheduleDemo')}</h1>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div style={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Form onSubmit={onSubmit} className={'w-75 m-5'}>
                <h3>{t('letUsKnowYourNeeds')}</h3>
                <br/>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>{t('emailAddress')}</Form.Label>
                  <Form.Control size="lg" type="email" placeholder="name@mail.com" value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>{t('letUsKnowMore')}</Form.Label>
                  <Form.Control size="lg" as="textarea" rows={3} value={textArea}
                                onChange={(e) => setTextArea(e.target.value)}/>
                </Form.Group>
                <button className={'btn btn-block'} type={'submit'}>{t('submit')}</button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Outlet/>
      {notification &&
        <div className={"notification"} style={notificationStyle}>{notification}</div>}
    </>
  );
}

export default LandingPage;