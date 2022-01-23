import { SxProps, Theme } from "@mui/material";

export const sxCondition = (prop: [SxProps<Theme>], condition: boolean) => {
  if (condition) return prop[0] as any;
  return {} as any;
};
