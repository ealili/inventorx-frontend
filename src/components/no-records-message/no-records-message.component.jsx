import { NoDataFoundYetContainer } from "../shared/shared.styles";
import PropTypes from "prop-types";

const NoRecordsMessage = ({ type }) => {
  return (
    <NoDataFoundYetContainer>
      You do not have any {type} yet. <br />
      Click the Create button to create one.
    </NoDataFoundYetContainer>
  );
};

export default NoRecordsMessage;

NoRecordsMessage.propTypes = {
  type: PropTypes.string,
};
