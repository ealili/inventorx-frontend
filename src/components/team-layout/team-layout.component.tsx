import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector.ts";
import {Navigate, Outlet} from "react-router-dom";

const TeamLayout = () => {
  const currentUser = useSelector(selectCurrentUser)

  console.log(currentUser);

  if (currentUser.role.name !== 'Admin') {
    return <Navigate to={'/forbidden'}/>
  }

  return (
    <>
      <Outlet/>
    </>
  );
}

export default TeamLayout