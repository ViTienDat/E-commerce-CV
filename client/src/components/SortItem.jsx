import React, { memo } from "react";

const SortItem = ({ value, changeValue, options }) => {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => changeValue(e.target.value)}
        name="sort"
        id="sort-card"
        className="outline-none border p-2 text-[13px]"
      >
        {options?.map((el) => (
          <option key={el.id} value={el.value}>
            {el.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SortItem);
