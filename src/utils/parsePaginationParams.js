const parseNumber = (string, defoultValue) => {
  const number = Number(string);

  if (Number.isNaN(number)) {
    return defoultValue;
  }
  return number;
};

export const parsePaginationsParams = (query) => {
  const page = parseNumber(query.page, 1);
  const perPage = parseNumber(query.perPage, 10);
  return { page, perPage };
};
