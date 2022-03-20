import { ICustomStyle } from "app/models/Style";

const styles: ICustomStyle = {
  container: {
    padding: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  activityInfo: {
    display: "flex",
    alignItems: "center",
  },
  activityAvatar: {
    width: "20px",
    height: "20px",
  },
  authorName: {
    color: "#1c1c1c",
    fontSize: "0.8rem",
    fontWeight: 700,
    marginLeft: "0.1rem",
  },
  acitvityDate: {
    color: "#787C7E",
    marginLeft: "0.5rem",
    fontWeight: 400,
    fontSize: "0.8rem",
  },
  activityTitle: {
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "center",
    padding: "0 1rem",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "500px",
  },
  activityVote: {
    display: "flex",
    alignItems: "center",
  },
  activityComments: {
    display: "flex",
    alignItems: "center",
  },
};

export default styles;
