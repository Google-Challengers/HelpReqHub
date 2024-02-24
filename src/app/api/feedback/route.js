import { connectToDB } from "@/lib/DBconnect.js";
import { FeedBackModel } from "@/lib/models/Feedback";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // getting the user details/feedback
    const { name, email, feedback } = await req.json();
    if (!name || !email || !feedback) throw new Error();

    // connect to the db
    await connectToDB();

    // saving the feedback
    const newFeedback = new FeedBackModel({
      name,
      email,
      data: feedback,
    });
    await newFeedback.save();

    return NextResponse.json({
      success: true,
      message: "User feedback added to database",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
