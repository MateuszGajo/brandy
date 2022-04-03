import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ActivitySchema = new Schema({
  id: {
    type: String,
    required: [true, "Enter id"],
  },
  userId: {
    type: String,
    required: [true, "Add userId reference"],
  },
  text: {
    type: String,
    required: [true, "enter text"],
  },
  photo: {
    type: String,
  },
  upVotes: {
    type: Number,
  },
  downVotes: {
    type: Number,
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
});

export default model("activity", ActivitySchema);
