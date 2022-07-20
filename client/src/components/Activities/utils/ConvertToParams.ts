import { IActivityFilters } from "app/models/Activity";

export const ConvertToParams = (filters: IActivityFilters) => {
  const params = new URLSearchParams();
  params.append("sort", filters.sort);

  return params;
};
