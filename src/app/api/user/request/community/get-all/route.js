import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { NewCommunityModel } from "@/lib/models/community/NewCommunity.model.js";

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

    // getting all the communities
    const coms = await NewCommunityModel.find();
    if (!coms || coms.length === 0) throw new Error(`No community found`);

    let com_data = [];
    coms.forEach((com) => {
      com_data.push({
        com_id: com._id,
        com_name: com.communityName,
        com_desc: com.desc,
        com_tags: com.tags,
        com_image: com.image,
      });
    });

    return NextResponse.json({
      success: true,
      message: "community details sent successfully",
      communityDetails: com_data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
