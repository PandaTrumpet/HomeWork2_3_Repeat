export const calculatePaginationParams = ({ total, page, perPage }) => {
  const totalPage = Math.ceil(total / perPage);
  const hasNextPage = page !== totalPage;
  const hasPrevPage = page !== 1;
  return {
    totalPage,
    hasNextPage,
    hasPrevPage,
    // page,
    // perPage,
    // totalItems: total,
    // totalPage,
    // hasNextPage,
    // hasPrevPage,
  };
};
