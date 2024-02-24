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

    // getting the community details
    const { communityName, desc, tags,image} = await req.json();
    if (!communityName || !desc || tags.length == 0)
      throw new Error(`All fields are required`);

    // creating new community
    const newCommunity = new NewCommunityModel({
      userId: user._id,
      admins: [user._id],
      communityName: String(communityName).replace(" ", "-"),
      desc,
      tags,
      image
    });
    await newCommunity.save();

    // creating the logs
    const newCommunityLogs = new NewCommunityLogsModel({
      communityName: String(communityName).replace(" ", "-"),
      rules: [],
      pendingMemberRequests: [],
      members: [user._id],
      messages: [{ msg: "Follow All the Rules.", time: new Date() }],
    });
    await newCommunityLogs.save();

    return NextResponse.json({
      success: true,
      message: "community/logs created successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
