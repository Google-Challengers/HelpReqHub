import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { RequestModel } from "@/lib/models/globalRequest/request.model.js";
import { UserModel } from "@/lib/models/user.model";
import { HelperModel } from "@/lib/models/globalHelps/helpers.model.js";

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

    // getting all the helps
    const helps = await HelperModel.findOne({ userId: user._id });
    if (!helps) throw new Error(`No help found`);

    let request_data = [];

    // getting the request(s) data
    await Promise.all(
      helps.requests.map(async (req_id) => {
        const request = await RequestModel.findOne({ _id: req_id });
        request_data.push({
          reqId: request._id,
          userId: request.userId,
          title: request.title,
          desc: request.desc,
          time: request.time,
          status: request.status,
          createdAt: request.createdAt,
        });
      })
    );

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
