import { connectToDB } from "@/lib/DBconnect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import bcrypt from "bcrypt";

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

    // checking the user method of sign in
    if (user.method !== "credentials") {
      throw new Error(`Only credential users are allowed to update`);
    }

    // getting the updated details
    const { name, password } = await req.json();
    if (!name && !password) throw new Error(`Invalid name or password`);

    // updating the user's name
    if (name !== user.name) {
      await UserModel.updateOne({ _id: user._id }, { $set: { name } });
    }
    // updating the user password
    if (!bcrypt.compareSync(password, user.password)) {
      await UserModel.updateOne(
        { _id: user._id },
        { $set: { password: bcrypt.hashSync(password, 10) } }
      );
    }

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
