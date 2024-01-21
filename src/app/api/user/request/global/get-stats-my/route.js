import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { RequestModel } from "@/lib/models/globalRequest/request.model.js";
import { UserModel } from "@/lib/models/user.model";

export const GET = async (req, res, next) => {
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

    // getting all the requests
    const requests = await RequestModel.find({ userId: user._id });
    if (!requests || requests.length === 0)
      throw new Error(`No requests found`);

    let request_data = [];

    // get all the users information
    requests.forEach((request) => {
      request_data.push({
        reqId: request._id,
        title: request.title,
        desc: request.desc,
        time: request.time,
        status: request.status,
        createdAt: request.createdAt,
        requestHandlers: request.requestHandlers,
      });
    });

    return NextResponse.json({
      success: true,
      message: "requests data sent successfully",
      request_data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
