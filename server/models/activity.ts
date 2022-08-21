import { IActivity } from "@/interfaces/IActivity";
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
    upVotesCount: {
      type: Number,
    },
    downVotesCount: {
      type: Number,
    },
    votes: {
      type: Number,
    },
    upVoteRatio: {
      type: Number,
      set: (val: number) => val.toFixed(2),
    },
    date: {
      type: Date,
      required: [true, "Enter create date"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.userVote = ret.userVote?.type || null;
      },
    },
    toObject: {
      virtuals: true,
    },
    versionKey: false,
  }
);

ActivitySchema.index({ upVoteRatio: -1 });
ActivitySchema.index({ date: -1 });
ActivitySchema.index({ upVotes: -1 });
ActivitySchema.index({ text: "text" });

ActivitySchema.virtual("userVote", {
  ref: "Vote",
  localField: "_id",
  foreignField: "activity",
  justOne: true,
});

export default model("Activity", ActivitySchema);
