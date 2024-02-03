import {useDispatch} from "react-redux";
import {setHeaderTitle} from "../../store/header/headerSlice.ts";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector.ts";
import {UserType} from "../../types/user.ts";
import UpdatePassword from "./UpdatePassword.tsx";
import {useTranslation} from "react-i18next";

export default function Profile() {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const selectedUser: UserType = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(setHeaderTitle(t('profileLink')));
  }, [dispatch]);

  return (
    <div className="profile-container">
      <div>
        {/*<img src={selectedUser} alt="User Avatar" />*/}
        <h1>{selectedUser?.name}</h1>
        <p><b>{t('emailAddress')}:</b> {selectedUser?.email}</p>
        <p><b>{t('role')}:</b> {selectedUser?.role?.name}</p>
        <p><b>{t('team')}:</b> {selectedUser?.team?.name}</p>
        <br/>
        <UpdatePassword/>
      </div>
    </div>
  );
}
