import mongoose from "mongoose";

const newCommunityLogsSchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: [true, "Community Name is required."],
      trim: true,
      unique: [true, "Community Name must be unique"],
      lowercase: true,
      ref: "newcommunity",
    },
    rules: {
      type: [
        {
          type: String,
          lowercase: true,
        },
      ],
      default: [],
    },
    pendingMemberRequests: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
    members: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
    messages: {
      type: [
        {
          msg: { type: String, trim: true, lowercase: true },
          time: { type: Date, default: new Date() },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const NewCommunityLogsModel =
  mongoose.models["newcommunitylog"] ||
  new mongoose.model("newcommunitylog", newCommunityLogsSchema);
