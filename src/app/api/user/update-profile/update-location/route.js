import { connectToDB } from "@/lib/DBconnect.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
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

    // getting the location
    const { lat, lng } = await req.json();
    if (lat === undefined || lat === undefined)
      throw new Error("Latitude and longitude are required");

    // updating the location
    await UserModel.updateOne(
      { _id: user._id },
      { $set: { location: { lat, lng } } }
    );

    return NextResponse.json({
      success: true,
      message: "Location has been updated.",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
