import { IActivityFilters } from "app/models/Activity";

export const ConvertToParams = (filters: IActivityFilters) => {
  const params = new URLSearchParams();
  filters.sort && params.append("sort", filters.sort);
  filters.search && params.append("search", filters.search);

  return params;
};
