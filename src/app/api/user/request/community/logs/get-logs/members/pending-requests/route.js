import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { NewCommunityModel } from "@/lib/models/community/NewCommunity.model.js";
import { NewCommunityLogsModel } from "@/lib/models/community/NewCommunityLogs.model.js";
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

    // getting the request details
    const { communityName } = await req.json();
    if (!communityName) throw new Error(`Invalid community`);

    // finding the community
    const com = await NewCommunityModel.findOne({
      communityName,
    });
    if (!com) throw new Error(`Community not found`);

    // checking if is admin
    if (!com.admins.includes(user._id)) throw new Error(`Not an administrator`);

    // finding the logs
    const logs = await NewCommunityLogsModel.findOne({ communityName });
    if (!logs) throw new Error(`Community logs not found`);

    let logsPendingMembersData = [];
    const promises = logs.pendingMemberRequests.map(async (member) => {
      const m_user = await UserModel.findOne({ _id: member });

      logsPendingMembersData.push({
        id: m_user._id,
        name: m_user.name,
        email: m_user.email,
        image: m_user.image,
        contact: m_user.contact,
      });
    });
    await Promise.all(promises);

    return NextResponse.json({
      success: true,
      message: "community/logs pending members sent successfully",
      logsMembers: logsPendingMembersData,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
