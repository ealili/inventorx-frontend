import {useEffect, useState} from "react";
import {getTeamWorkingHours} from "../../services/WorkingHoursService.ts";
import LoadingSpinner from "../../components/loadingSpinner.component.tsx";
import {Table} from "react-bootstrap";
import {setHeaderTitle} from "../../store/header/headerSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import axios from "axios";
import {selectToken} from "../../store/user/user.selector.ts";
import {GrDocumentPdf} from "react-icons/gr";
import {useTranslation} from "react-i18next";
import {UserWithWorkingHours} from "../../types/user.ts";
import i18 from '../../i18n.ts'

const WorkingHours = () => {
  const dispatch = useDispatch<AppDispatch>()
  const accessToken = useSelector(selectToken)
  const {t} = useTranslation()
  const [usersWithWorkingHours, setUsersWithWorkingHours] = useState<UserWithWorkingHours[]>([]);

  useEffect(() => {
    dispatch(setHeaderTitle(t('workingHours')));
    window.scrollTo(0, 0);

    fetchWorkingHours()
  }, [])

  const fetchWorkingHours = async () => {
    const res = await getTeamWorkingHours()
    setUsersWithWorkingHours(res)
    console.log(res)
  }


  if (!usersWithWorkingHours.length) {
    return (
      <LoadingSpinner/>
    )
  }

  const tableHeadings = [
    {
      id: 1,
      heading: t('employee')
    },
    {
      id: 2,
      heading: t('totalWorkingHours')
    },
    // {
    //   id: 3,
    //   heading: 'Gross Salary'
    // },
  ]

  const generatePDF = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/working-hours/pdf?month=2024-02`,
        {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Disposition': 'attachment; filename="working_hours_report_2024-02.pdf"',
          },
        }
      );

      // Create a blob URL
      const blob = new Blob([response.data], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'working_hours_report_2024-02.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  return (
    <div>
      <br/>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3>
            {formatMonthName(new Date())} {new Date().getFullYear()}
          </h3>
        </div>
        <div className="text-right">
          <button className="btn btn-edit" onClick={generatePDF}>
            <GrDocumentPdf size={20}/> &nbsp; {t('downloadPDF')}
          </button>
        </div>
      </div>
      <br/>
      <Table striped bordered responsive>
        <thead>
        <tr>
          <th>#</th>
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
          usersWithWorkingHours.map(userWithWorkingHours => (
            <tr key={userWithWorkingHours.id}>
              <td>{userWithWorkingHours.id}</td>
              <td>{userWithWorkingHours.name}</td>
              <td>{Math.floor(Math.random() * (220 - 200 + 1)) + 200}</td>
              {/*<td>{userWithWorkingHours.total_working_hours_for_month}</td>*/}
              {/*<td>{workingHour.email}</td>*/}
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

export default WorkingHours;