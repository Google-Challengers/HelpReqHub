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
    const { communityName } = await req.json();
    if (!communityName) throw new Error(`community name is required`);

    let user_checks = {
      isAdmin: false,
      joined: false,
      name: "",
      desc: "",
      tags: [],
    };

    // getting the new community
    const com = await NewCommunityModel.findOne({ communityName });
    if (!com) throw new Error(`Community not found`);
    else {
      user_checks.name = com.communityName;
      user_checks.desc = com.desc;
      user_checks.tags = com.tags;
    }

    // checking if is admiin
    if (com.admins.includes(user._id)) {
      user_checks.isAdmin = true;
      user_checks.joined = true;
    }

    if (!user_checks.isAdmin) {
      // finding the logs
      const logs = await NewCommunityLogsModel.findOne({ communityName });
      if (!logs) throw new Error(`Community logs not found`);

      if (logs.members.includes(user._id)) {
        user_checks.joined = true;
      }
    }

    return NextResponse.json({
      success: true,
      message: "user checks sent successfully",
      user_checks,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
