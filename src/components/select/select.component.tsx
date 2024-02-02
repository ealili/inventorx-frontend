import React, {ChangeEvent} from "react";
import './select.styles.scss'

interface SelectProps<T> {
  name: string;
  selected: number | string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  data: T[];
  col: keyof T;
}

const Select = <T extends { id: React.Key }>({
                                               name,
                                               selected,
                                               handleChange,
                                               data,
                                               col
                                             }: SelectProps<T>) => {
  return (
    <>
      <label className="form-label">{name}</label>
      <select className="select-input" name={name} value={selected} onChange={handleChange}>
        {data.map((item) => (
          <option key={item.id} value={item.id.toString()}>
            {String(item[col])}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
