import mongoose from "mongoose";

const communityRequestSchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: [true, "Community Name is required."],
      trim: true,
      lowercase: true,
      ref: "newcommunity",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "User Id is required"],
    },
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Title is required"],
    },
    desc: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Description is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    image: {
      type: String,
      required: true,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/f/f8/01_Icon-Community%402x.png",
    },
  },
  
  { timestamps: true }
);

export const CommunityRequestModel =
  mongoose.models["communityrequest"] ||
  new mongoose.model("communityrequest", communityRequestSchema);
