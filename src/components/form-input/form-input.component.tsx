import { forwardRef, ChangeEvent } from "react";
import "./form-input.styles.css";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Define the onChange handler
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    // Destructure props to separate `ref` and `onChange` from other props
    const { name, disabled, onChange, ...otherProps } = props;

    let inputClass = "";
    if (disabled) {
      inputClass = "input-disabled"; // Apply the disabled class if disabled is true
    }

    return (
      <>
        <label className="form-label">{name}</label>
        <input
          ref={ref}
          placeholder={name}
          className={inputClass} // Use the class
          onChange={onChange} // Pass down the onChange handler
          {...otherProps}
        />
      </>
    );
  }
);

export default FormInput;
