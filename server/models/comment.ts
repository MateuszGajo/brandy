import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: "activity",
    },
    text: {
      type: String,
      required: [true, "enter text"],
    },
    date: {
      type: Date,
      required: [true, "Enter create date"],
    },
  },
  { versionKey: false }
);

export default model("Comment", CommentSchema);
