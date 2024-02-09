import React, {useEffect, useState} from "react";
import './dashboard.styles.scss';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {setHeaderTitle} from "../../store/header/headerSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import i18 from '../../i18n.ts'
import {useTranslation} from "react-i18next";
import {selectCurrentUser} from "../../store/user/user.selector.ts";
import {getEmployeeWorkingHour, storeWorkingHours} from "../../services/WorkingHoursService.ts";
import LoadingSpinner from "../../components/loadingSpinner.component.tsx";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {Col, Form, Row} from "react-bootstrap";
import {WorkingHoursPayload} from "../../types/working-hours.ts";
import {notify} from "../../store/notification/notificationSlice.ts";


console.log(i18.language)

const Dashboard = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>()
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const currentUser = useSelector(selectCurrentUser)
  const [workingHour, setWorkingHour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [workingHoursField, setWorkingHoursField] = useState(9)


  useEffect(() => {
    dispatch(setHeaderTitle(t('dashboard')));
    window.scrollTo(0, 0);

    fetchEmployeeWorkingHour()

    console.log(formatDateDashed(currentDate))
  }, [currentDate])

  const fetchEmployeeWorkingHour = async () => {
    try {
      const workingHour = await getEmployeeWorkingHour(currentUser.id, formatDateDashed(currentDate));
      setWorkingHour(workingHour);
      console.log(workingHour);
    } catch (err) {
      setWorkingHour(null)
    }
    setLoading(false)

  }

  const updateDate = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);
    setCurrentDate(newDate);
  };

  const handlePrevDate = () => {
    updateDate(-1);
  };

  const handleNextDate = () => {
    updateDate(1);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: WorkingHoursPayload = {
      date: formatDateDashed(currentDate),
      working_hours: workingHoursField
    }

    await storeWorkingHours(payload);

    dispatch(notify({message: "Hours stored successfully", type: 'success'}));

    fetchEmployeeWorkingHour()
  }

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <div className={"card animated fadeInDown"} style={{padding: '', height: '87vh'}}>
        <div className={'date-picker-container'}>
        <span>
          <FaArrowLeft className={'date-arrow'} onClick={handlePrevDate}/>
        </span>
          <span className={'date-span'}>
        {getDayName(currentDate)}, {formatDate(currentDate)}
        </span>
          <span>
          <FaArrowRight className={'date-arrow'} onClick={handleNextDate}/>
        </span>
        </div>
        <br/>
        {
          workingHour !== null ? (
            <>
              <div>
                <h3 className={'text-center'}>
                  {/*You successfully checked in for {formatDate(currentDate)}*/}
                  {t('successfulCheckIn')}
                </h3>
                <br/>
                <div className={'text-center'}>
                  <IoIosCheckmarkCircle style={{color: '#32de84', fontSize: '72px'}}/>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <hr/>
                <br/>
                <h3 className={'text-center'}>
                  {t('checkIn')} {formatDate(currentDate)}
                </h3>
                <br/>

                <div className={'text-center'}>
                  <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formPlaintextPassword">
                      <Row className={'justify-content-center align-items-center'}>
                        <Col lg={1}>
                          <Form.Label>
                            {t('workingHours')}
                          </Form.Label>
                        </Col>
                        <Col lg={3}>
                          <Form.Control type="number" value={workingHoursField.toString()} onChange={(e) => setWorkingHoursField(parseInt(e.target.value, 10))} placeholder="Working Hours"/>
                        </Col>
                      </Row>
                      <br/>
                      <Row className={'justify-content-center'}>
                        <Col lg={6}>
                          <button className={'btn btn-add w-50'} type={'submit'}>{t('enter')}</button>
                        </Col>
                      </Row>
                    </Form.Group>

                  </Form>
                </div>
              </div>
            </>
          )
        }

        {/*{*/}
        {/*  selectedTimeslot && selectedMachine && <CenteredModal*/}
        {/*    show={modalShow}*/}
        {/*    onHide={() => setModalShow(false)}*/}
        {/*    organizationTimeSlot={selectedTimeslot}*/}
        {/*    machine={selectedMachine}*/}
        {/*    date={formatDateDashed(currentDate)}*/}
        {/*    submissionSuccessCallback={handleSubmissionSuccess}*/}
        {/*    booking={selectedBooking}*/}
        {/*  />*/}
        {/*}*/}
      </div>
    </>
  );
}

export default Dashboard;


function formatDateDashed(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function formatDate(date: Date, locale: string = i18.language): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return date.toLocaleDateString(locale, options).replace(/\//g, '-');
}

const getDayName = (date: Date, locale: string = i18.language) => {
  return date.toLocaleString(locale, {weekday: 'long'});
};

// const getMonthName = (date: Date, locale: string = i18.language) => {
//   return date.toLocaleString(locale, {month: 'long'});
// };

