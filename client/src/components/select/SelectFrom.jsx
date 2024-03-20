import React, { memo } from "react";

const SelectFrom = ({
  label,
  options = {},
  register,
  id,
  errors,
  validate,
  style,
  fullwidth,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col  h-[30px] gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        defaultValue={defaultValue}
        className={`${fullwidth && `w-full`} ${style && style}`}
        id={id}
        {...register(id, validate)}
      >
        {options?.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(SelectFrom);
