import {TbError404} from "react-icons/tb";
import './not-found.styles.scss';

export default function NotFound() {
  return (
    <>
      <div className={'flex-container'}>
        <div>
          <TbError404 size={120}/>
        </div>
        <div>
          <h1 className={'not-found-header'}>
            The page you are looking for could not be found!
          </h1>
        </div>
      </div>
    </>);
}
