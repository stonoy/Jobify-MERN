import React from "react";

const FormSelect = ({ name, defaultValue, list, labelText, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
