import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { RequestModel } from "@/lib/models/globalRequest/request.model.js";
import { UserModel } from "@/lib/models/user.model";

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
    if (!reqId) throw new Error(`Request id not provided`);

    // getting the request
    const requests = await RequestModel.findOne({ _id: reqId });
    if (!requests || requests.length === 0)
      throw new Error(`No requests found`);

    // checking if user created it
    if (String(requests.userId) == String(user._id))
      throw new Error(`Requestor cannot join`);

    // checking if already joined
    if (requests.requestHandlers.includes(user._id))
      throw new Error(`Already joined`);

    // checking if completed
    if (requests.status != "pending")
      throw new Error(`Already completed cannot join`);

    // joining
    await RequestModel.updateOne(
      { _id: reqId },
      { $set: { requestHandlers: [...requests.requestHandlers, user._id] } }
    );

    return NextResponse.json({
      success: true,
      message: "joined for helping successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
