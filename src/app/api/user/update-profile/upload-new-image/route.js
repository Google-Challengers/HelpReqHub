import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/DBconnect.js";
import { UserModel } from "@/lib/models/user.model.js";

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

    // getting the updated details
    const { userId, imageUrl } = await req.json();
    if (!userId || !imageUrl || String(userId) != String(user._id))
      throw new Error(`Invalid details`);

    // updating
    await UserModel.updateOne({ _id: user._id }, { $set: { image: imageUrl } });

    return NextResponse.json({
      success: true,
      message: "Profile has been updated.",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
