export const parseSortParams = (query) => {
  const sortOrder = ['asc', 'desc'].includes(query.sortOrder)
    ? query.sortOrder
    : 'asc';
  const sortBy = ['name'].includes(query.sortBy) ? query.sortBy : 'asc';
  return { sortOrder, sortBy };
};
