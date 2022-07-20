import mongoose from "mongoose";
const { Schema, model } = mongoose;
import CommentSchema from "./comment";

const ActivitySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "enter text"],
    },
    photo: {
      type: String,
    },
    upVotes: {
      type: [String],
    },
    downVotes: {
      type: [String],
    },
    votes: {
      type: Number,
    },
    upVoteRatio: {
      type: Number,
    },
    date: {
      type: Date,
      required: [true, "Enter create date"],
    },
    comments: [CommentSchema.schema],
  },
  { versionKey: false }
);

export default model("activity", ActivitySchema);
