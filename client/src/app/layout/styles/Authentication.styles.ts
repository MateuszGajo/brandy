import { ICustomStyle } from "app/models/Style";

const styles: ICustomStyle = {
  wrapper: {
    background: (theme) =>
      `linear-gradient(to right, ${theme.palette.secondary.main},${theme.palette.primary.light} )`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  content: {},
  brandItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  brandHeading: {
    fontWeight: 500,
  },
  child: {
    padding: 2,
    paddingBottom: 6,
  },
};

export default styles;
