import { connectToDB } from "@/lib/DBconnect.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ReviewModel } from "@/lib/models/review.model.js";

export const GET = async (req, res) => {
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

    // getting the reviews
    const my_reviews = await ReviewModel.findOne({ userId: user._id });
    if (!my_reviews) throw new Error(`No reviews found`);

    // data to be sent to the client
    const data = [];

    await Promise.all(
      my_reviews.reviews.map(async (review) => {
        const r_id = review.reviewerId;
        const r_user = await UserModel.findOne({ _id: r_id });

        data.push({
          uid: r_user._id,
          uname: r_user.name,
          email: r_user.email,
          contact: r_user.contact,
          image: r_user.image,
          review: review.review,
        });
      })
    );

    return NextResponse.json({
      success: true,
      message: "User reviews data sent.",
      userReviewData: data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
