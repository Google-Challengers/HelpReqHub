import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { NewCommunityModel } from "@/lib/models/community/NewCommunity.model.js";
import { NewCommunityLogsModel } from "@/lib/models/community/NewCommunityLogs.model.js";

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
    const { communityName, rule } = await req.json();
    if (!communityName || !rule) throw new Error(`All fields are required`);

    // finding the community
    const com = await NewCommunityModel.findOne({ communityName });
    if (!com) throw new Error(`Community not found`);

    // checking user authorization
    if (!com.admins.includes(user._id)) throw new Error(`Not an administrator`);

    // finding community logs
    const log = await NewCommunityLogsModel.findOne({ communityName });
    if (!log) throw new Error(`Community logs not found`);

    // adding the logs [rules]
    await NewCommunityLogsModel.updateOne(
      { _id: log._id },
      { $set: { rules: [...log.rules, rule] } }
    );

    return NextResponse.json({
      success: true,
      message: "rule added successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
