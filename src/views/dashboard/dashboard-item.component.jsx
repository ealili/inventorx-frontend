import { DashboardItemContainer } from "./dashboard.styles";
import PropTypes from "prop-types";

const DashboardItem = ({ model, count }) => {
  const formatString = (string) => {
    string = string.replace("_count", "");
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <DashboardItemContainer>
      <h2>{count}</h2>
      <h2>{formatString(model)}</h2>
    </DashboardItemContainer>
  );
};

export default DashboardItem;

DashboardItem.propTypes = {
  model: PropTypes.string,
  count: PropTypes.number,
};
