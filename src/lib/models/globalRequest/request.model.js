import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      lowercase: true,
      lowercase: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
      lowercase: true,
      required: [true, "Status can be one of [COMPLETE, PENDING]"],
      trim: true,
    },
    requestHandlers: {
      type: [{ type: mongoose.Types.ObjectId, ref: "user" }],
      default: [],
    },
  },
  { timestamps: true }
);

export const RequestModel =
  mongoose.models["request"] || new mongoose.model("request", requestSchema);
