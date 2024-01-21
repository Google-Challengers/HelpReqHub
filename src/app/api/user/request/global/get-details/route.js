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

    // getting the id
    const { reqId } = await req.json();
    if (!reqId) throw new Error(`Request id not provided`);

    // getting all the requests
    const requests = await RequestModel.findOne({ _id: reqId });
    if (!requests || requests.length === 0)
      throw new Error(`No requests found`);

    return NextResponse.json({
      success: true,
      message: "requests details sent successfully",
      requestDetails: requests,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
