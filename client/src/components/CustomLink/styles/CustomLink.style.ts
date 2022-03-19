import { ICustomStyle } from "app/models/Style";

const styles: ICustomStyle = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperActive: {
    borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
  },
};

export default styles;
