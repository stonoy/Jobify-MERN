import React from "react";

const FormRow = ({
  type,
  name,
  defaultValue,
  labelText,
  required = true,
  onChange,
}) => {
  // console.log(defaultValue);
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue || ""}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
