interface APIError {
  code: number;
  message: string;
}

export function isAPIError(x: any): x is APIError {
  return typeof x.code === "number";
}
