import PropTypes from "prop-types";
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input className={"form-input"} placeholder={label} {...otherProps} />
    </>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormInput;
