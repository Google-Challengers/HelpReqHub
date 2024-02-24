import mongoose from "mongoose";

const usersFeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    data: {
      type: String,
      required: [true, "Feedback is required"],
    },
  },
  { timestamps: true }
);

export const FeedBackModel =
  mongoose.models["feedback"] ||
  new mongoose.model("feedback", usersFeedbackSchema);
