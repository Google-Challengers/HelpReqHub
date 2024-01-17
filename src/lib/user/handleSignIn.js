import { connectToDB } from "../DBconnect.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const handleSignIn = async ({
  name,
  email,
  contact,
  password,
  image,
  method,
}) => {
  try {
    // converting name to lower case
    name = String(name).toLowerCase();

    // connect to database
    await connectToDB();

    // login user if exists
    const user = await UserModel.findOne({ name, email, contact });
    if (user) {
      // matching previous method and current method of authentication
      if (method !== user.method) {
        throw new Error(`Authentication method ${method}`);
      }

      // checking which method user is using
      if (method === "credentials") {
        // comparing the password
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error(`Password mismatch.`);
        }
      }
      let userData = {
        id: user._id,
        name: name,
        email,
        image: user.image,
        joined_at: user.createdAt,
      };

      return {
        success: true,
        message: `User found.`,
        userData,
      };
    }

    // generating new password if not provided
    if (method !== "credentials" && !password) {
      password = crypto.randomBytes(16).toString("hex");
    }

    if (!image) image = undefined;

    // create new user if do not exists
    await new UserModel({
      email,
      contact,
      password: bcrypt.hashSync(password, 10),
      name,
      image,
      method,
    }).save();

    const newUser = await UserModel.findOne({ name, email, contact });
    let userData = {
      id: newUser._id,
      name,
      email,
      contact: newUser.contact,
      image: newUser.image,
      joined_at: newUser.createdAt,
    };

    return {
      success: true,
      message: `User created.`,
      userData,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
