import PropTypes from "prop-types";

const PageHeader = ({ model, title = "" }) => {
  return (
    <div style={{ fontSize: "24px" }}>
      <span>{model} </span>
      <span style={{ fontWeight: "800" }}>
        <b>
          <i>{title}</i>
        </b>
      </span>
    </div>
  );
};
export default PageHeader;

PageHeader.propTypes = {
  model: PropTypes.string.isRequired,
  title: PropTypes.string,
};

PageHeader.defaultProps = {
  title: "",
};
