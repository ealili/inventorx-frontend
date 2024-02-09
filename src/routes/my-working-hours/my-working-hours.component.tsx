import {useEffect, useState} from "react";
import {
  getEmployeeWorkingHoursByMonth,
} from "../../services/WorkingHoursService.ts";
import LoadingSpinner from "../../components/loadingSpinner.component.tsx";
import {Table} from "react-bootstrap";
import {setHeaderTitle} from "../../store/header/headerSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {selectCurrentUser} from "../../store/user/user.selector.ts";
// import {GrDocumentPdf} from "react-icons/gr";
import {useTranslation} from "react-i18next";
import i18 from '../../i18n.ts'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import de from "date-fns/locale/de";
import {WorkingHour} from "../../types/working-hours.ts";

const MyWorkingHours = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector(selectCurrentUser)
  const [loading, setLoading] = useState(false)
  const {t} = useTranslation()
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const locale = i18.language === 'de' ? de : ''

  useEffect(() => {
    dispatch(setHeaderTitle(t('workingHours')));
    window.scrollTo(0, 0);

    const formattedDate = selectedDate.toISOString().slice(0, 7);

    fetchUserWorkingHours(formattedDate)
  }, [selectedDate])

  const fetchUserWorkingHours = async (date: string) => {
    console.log("Date that should be fetched ", date)
    setLoading(true)
    const res = await getEmployeeWorkingHoursByMonth(currentUser.id, date)

    setWorkingHours(res)
    console.log(res)
    setLoading(false)
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  const tableHeadings = [
    {
      id: 1,
      heading: t('Date')
    },
    {
      id: 2,
      heading: t('Hours')
    },
  ]

  // const generatePDF = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/working-hours/pdf?month=2024-02`,
  //       {
  //         responseType: 'blob',
  //         headers: {
  //           'Authorization': `Bearer ${accessToken}`,
  //           'Content-Disposition': 'attachment; filename="working_hours_report_2024-02.pdf"',
  //         },
  //       }
  //     );
  //
  //     // Create a blob URL
  //     const blob = new Blob([response.data], {type: 'application/pdf'});
  //     const blobUrl = URL.createObjectURL(blob);
  //
  //     // Create a link element and simulate a click to trigger the download
  //     const link = document.createElement('a');
  //     link.href = blobUrl;
  //     link.download = 'working_hours_report_2024-02.pdf';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //
  //     // Clean up the blob URL
  //     URL.revokeObjectURL(blobUrl);
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //   }
  // };


  return (
    <div>
      <br/>
      <div>
        <div className={'d-flex justify-content-between align-items-center'}>
          <h3>
            {formatMonthName(new Date())} {new Date().getFullYear()}
          </h3>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM"
              showMonthYearPicker
              locale={locale}
            />
          </div>
        </div>
        {/*<div className="text-right">*/}
        {/*  <button className="btn btn-edit" onClick={generatePDF}>*/}
        {/*    <GrDocumentPdf size={20}/> &nbsp; {t('downloadPDF')}*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
      <br/>
      <Table striped bordered responsive>
        <thead>
        <tr>
          {
            tableHeadings.map(heading => (
              <th key={heading.id}>
                {heading.heading}
              </th>
            ))
          }
        </tr>
        </thead>
        <tbody>
        {
          workingHours.map(wh => (
            <tr key={wh.id}>
              <td>{wh.date}</td>
              <td>{wh.working_hours}</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  );
}

function formatMonthName(date: Date, locale: string = i18.language): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export default MyWorkingHours;