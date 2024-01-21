import mongoose from "mongoose";

const newCommunitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Who is creating this community?"],
    },
    admins: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          required: [true, "Admin required"],
        },
      ],
      required: [true, "Admins are required."],
    },
    communityName: {
      type: String,
      required: [true, "Community Name is required."],
      trim: true,
      unique: [true, "Community Name must be unique"],
      lowercase: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tags: {
      type: [
        {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
      ],
      default: ["no-tags"],
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

export const NewCommunityModel =
  mongoose.models["newcommunity"] ||
  new mongoose.model("newcommunity", newCommunitySchema);
