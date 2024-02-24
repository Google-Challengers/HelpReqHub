import mongoose from "mongoose";

const helperSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    requests: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "request",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const HelperModel =
  mongoose.models["helper"] || new mongoose.model("helper", helperSchema);
