import { connectToDB } from "@/lib/DBconnect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../../auth/[...nextauth]/route.js";

export const POST = async (req, res) => {
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

    // getting the other user id
    const { other_userId } = await req.json();
    if (!other_userId) throw new Error(`user id is required`);

    // finding the user
    const other_user = await UserModel.findOne({ _id: other_userId });
    if (!other_user) throw new Error(`User not found`);

    // details
    let profileData = {
      id: other_user._id,
      name: other_user.name,
      email: other_user.email,
      image: other_user.image,
      contact: other_user.contact,
    };

    return NextResponse.json({
      success: true,
      message: "Profile has been sent.",
      profileData,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
