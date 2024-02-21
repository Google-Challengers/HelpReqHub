import { connectToDB } from "@/lib/DBconnect.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ReviewModel } from "@/lib/models/review.model.js";

export const POST = async (req, res) => {
  try {
    // getting the session details
    const token = await getToken({ req });
    const session = await getServerSession(authOptions);
    if (!token || !session) throw new Error(`Not authenticated`);

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await UserModel.findOne({
      name: session.user.name,
      email: session.user.email,
    });
    if (!user) throw new Error(`User not found`);

    // getting the details from the request
    const { userId, review } = await req.json();
    if (!userId || !review)
      throw new Error(`User id and review both are required`);

    // saving the review
    const reviewData = {
      reviewerId: user._id,
      review,
    };
    const _review_ = await ReviewModel.findOne({ userId });
    if (_review_) {
      await ReviewModel.updateOne(
        { _id: _review_._id },
        { $push: { reviews: reviewData } }
      );
    } else {
      const newReview = await ReviewModel({ userId, reviews: [reviewData] });
      await newReview.save();
    }

    return NextResponse.json({
      success: true,
      message: "User review added to database",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
