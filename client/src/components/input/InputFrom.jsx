import React, { memo } from "react";

const InputFrom = ({
  label,
  disabled,
  register,
  error,
  id,
  validate,
  type = "text",
  placeholder,
  defaultValue,
  fullwidth,
  style,
}) => {
  return (
    <div className="flex flex-col h-[30px] gap-2">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={`${fullwidth && "w-full"} ${style ? style : ""}`}
        defaultValue={defaultValue}
      />
      {error[id] && (
        <small className="text-xs text-red-500">{error[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputFrom);
