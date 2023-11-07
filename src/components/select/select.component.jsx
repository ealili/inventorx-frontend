import "./select.styles.scss";

import React from "react";

const Select = ({ name, selected, handleChange, data, col }) => {
  return (
    <>
      <label className="form-label">{name}</label>
      <select className="select-input" name={name} id="" value={selected} onChange={handleChange}>
        {data &&
          data.map((x) => (
            <option key={x.id} value={x.id}>
              {x[col]}
            </option>
          ))}
      </select>
    </>
  );
};

export default Select;
