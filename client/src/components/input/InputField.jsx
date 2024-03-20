import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <input
        onFocus={() => setInvalidFields && setInvalidFields([])}
        type={type || "text"}
        className="px-4 py-2 border w-full outline-none"
        placeholder={placeholder || nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-[10px] text-red-500 italic">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default InputField;
