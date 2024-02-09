import './forbidden.styles.scss';
import { TbHandStop } from "react-icons/tb";


export default function Forbidden() {
  return (
    <>
      <div className={'flex-container'}>
        <div>
          <TbHandStop size={120}/>
        </div>
        <div>
          <h1 className={'not-found-header'}>
            Forbidden. You do not have access to this page!
          </h1>
        </div>
      </div>
    </>);
}
