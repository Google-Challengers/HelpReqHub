import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { UserModel } from "@/lib/models/user.model.js";
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

    // getting the request id
    const { reqId } = await req.json();
    if (!reqId) throw new Error(`Request id required.`);

    // getting the request
    const request = await RequestModel.findOne({ _id: reqId });
    if (!request) throw new Error(`Request not found`);

    // constraints
    if (String(user._id) != String(request.userId))
      throw new Error(`Not allowed to update`);

    // updating the status
    await RequestModel.updateOne(
      { _id: request._id },
      { $set: { status: "complete" } }
    );

    return NextResponse.json({
      success: true,
      message: "request status => [Completed]",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
