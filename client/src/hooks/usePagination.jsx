import React, { useMemo } from "react";
const productLimit = import.meta.env.VITE_APP_API_URL;
import { gennerateRange } from "../ultils/helpers";

const usePagination = (totalCount, currentPage, siblingCount = 1) => {
  const panigationArray = useMemo(() => {
    const pageSize = 10;
    const panigationCount = Math.ceil(totalCount / pageSize);
    const totalPanigationItem = siblingCount + 5;

    if (panigationCount <= totalPanigationItem)
      return gennerateRange(1, panigationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < panigationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = panigationCount - 4;
      const rightRange = gennerateRange(rightStart, panigationCount);
      return [1, "...", ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = gennerateRange(1, 5);
      return [...leftRange, "...", panigationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const singlingRight = Math.min(currentPage + siblingCount, panigationCount);

    if ((isShowLeft, isShowRight)) {
      const middleRange = gennerateRange(siblingLeft, singlingRight);
      return [1, "...", ...middleRange, "...", panigationCount];
    }
  }, [totalCount, currentPage, siblingCount]);

  return panigationArray;
};

export default usePagination;
