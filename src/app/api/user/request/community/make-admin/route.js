import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { NewCommunityModel } from "@/lib/models/community/NewCommunity.model.js";
import { NewCommunityLogsModel } from "@/lib/models/community/NewCommunityLogs.model";

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

    // get the new-admin id
    const { newAdminId, communityName } = await req.json();
    if (!newAdminId || !communityName) throw new Error(`Invalid admin id`);

    // checking if the user exists in the database
    const newAdmin = await UserModel.findOne({ _id: newAdminId });
    if (!newAdmin) throw new Error(`New Admin Id is not valid`);

    // checking if the community exists in the database
    const com = await NewCommunityModel.findOne({ communityName });
    if (!com) throw new Error(`Community not found`);

    // checking if the user adding is an admin
    if (!com.admins.includes(user._id)) throw new Error(`Only admins can add`);

    // checking if new user is already admin
    if (com.admins.includes(newAdminId))
      throw new Error(`Already in admin list`);

    // checking if new user is not a member
    const logs = await NewCommunityLogsModel.findOne({ communityName });
    if (!logs) throw new Error(`No logs found for the community`);
    if (!logs.members.includes(newAdminId))
      throw new Error(`User is not a member`);

    // adding to the community admins list
    await NewCommunityModel.updateOne(
      { communityName },
      { $push: { admins: newAdminId } }
    );

    return NextResponse.json({
      success: true,
      message: "Made admin successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
