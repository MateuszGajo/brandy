import { HttpParams } from '@angular/common/http';

export const convertToParams = (params: { [key: string]: any }) => {
  const searchParams = new HttpParams();
  Object.keys(params).map((key) => {
    console.log(key);
    console.log(params[key]);
    searchParams.append('sort', 'sd');
  });
  return searchParams;
};
