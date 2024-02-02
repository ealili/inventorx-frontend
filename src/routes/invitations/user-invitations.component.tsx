import {PageHeaderContainer} from "../users/shared.styles.tsx";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setHeaderTitle} from "../../store/header/headerSlice.ts";
import NoRecordsMessage from "../users/no-records-message.component.tsx";
import {RxCross2} from "react-icons/rx";
import {notify} from "../../store/notification/notificationSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import {cancelInvitation, getAllInvitations} from "../../services/InvitationService.ts";
import {UserInvitation} from "../../types/invitation.ts";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner.component.tsx";
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function UserInvitations() {
  const dispatch: AppDispatch = useDispatch();
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()

  useEffect(() => {
    dispatch(setHeaderTitle(t('invitationsLink')));
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    console.log('Fetching invitations')
    setLoading(true);
    try {
      const invitations = await getAllInvitations();
      console.log(invitations);
      setInvitations(invitations);
    } catch (err) {
    }
    setLoading(false);
  };

  const handleClick = async (invitationToken: string) => {
    try {
      await cancelInvitation(invitationToken);
      dispatch(notify({message: 'Invitation cancelled successfully', type: 'success'}))
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err?.message : err;
      console.log(errorMessage)
    }

    await fetchInvitations()
  }

  return (
    <div>
      <PageHeaderContainer>
        <h3>{t('pendingInvitations')}</h3>
        <Link
          style={{padding: "10px 40px", fontSize: "16px"}}
          className={"btn-add"}
          to={"/invite"}
        >
          Create
        </Link>
      </PageHeaderContainer>

      {loading ? (
        <LoadingSpinner/>
      ) : (
        invitations.length > 0 && (
          <div className={"card animated fadeInDown"}>
            <Table bordered striped responsive>
              <thead>
              <tr>
                <th>Email</th>
                {/*<th>Room Number</th>*/}
                {/*<th>Role</th>*/}
                <th>Invited at</th>
                <th style={{textAlign: "right"}}>Cancel</th>
              </tr>
              </thead>
              <tbody>
              {invitations.map((invitation: UserInvitation) => (
                <tr key={invitation.id}>
                  <td>{invitation.email}</td>
                  {/*<td>{invitation.room_number}</td>*/}
                  {/*<td>{invitation.role.name}</td>*/}
                  <td>
                    {new Date(invitation.created_at).toLocaleString()}
                  </td>
                  <td style={{textAlign: "right"}}>
                    <RxCross2
                      id={"cross-button"}
                      style={{color: "red", fontSize: "22px"}}
                      onClick={() => handleClick(invitation.invitation_token)}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        )
      )}
      {invitations.length < 1 && <NoRecordsMessage type={"user invitations"}/>}
    </div>
  );
}
