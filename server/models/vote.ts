import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activity: {
    type: mongoose.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  type: {
    type: String,
    enum: ["up", "down"],
    required: true,
  },
});

VoteSchema.index({ activity: 1, user: 1 });

export default mongoose.model("Vote", VoteSchema);
