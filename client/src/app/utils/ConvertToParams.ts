export const ConvertToParams = (filters: any) => {
  const params = new URLSearchParams();
  if (typeof filters !== "object") return params;
  filters.sort && params.append("sort", filters.sort);
  filters.search && params.append("search", filters.search);
  filters.limit && params.append("limit", filters.limit);
  filters.start && params.append("start", filters.start);

  return params;
};
