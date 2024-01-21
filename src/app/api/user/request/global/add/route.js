import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { RequestModel } from "@/lib/models/globalRequest/request.model.js";

export const POST = async (req, res, next) => {
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

    // getting the request details
    const { title, desc, time } = await req.json();
    if (!title || !desc || !time) throw new Error(`All fields are required`);

    // adding new request
    const newRequest = new RequestModel({
      userId: user._id,
      title,
      desc,
      time,
    });
    await newRequest.save();

    return NextResponse.json({
      success: true,
      message: "request added successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
