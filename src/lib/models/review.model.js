import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "user id is required"],
      unique: true,
    },
    reviews: {
      type: [
        {
          reviewerId: {
            type: mongoose.Types.ObjectId,
            required: [true, "user id is required"],
            unique: true,
          },
          review: {
            type: String,
            required: [true, "review id is required"],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const ReviewModel =
  mongoose.models["review"] || new mongoose.model("review", reviewsSchema);
