import { connectToDB } from "@/lib/DBconnect.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { RequestModel } from "@/lib/models/globalRequest/request.model.js";
import { HelperModel } from "@/lib/models/globalHelps/helpers.model.js";

export const GET = async (req, res) => {
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

    // map/location data
    let mapData = [];

    // get all the users
    const allUsers = await UserModel.find({});
    if (!allUsers || allUsers.length == 0) throw new Error(`No users found`);

    // creating the data to be sent
    await Promise.all(
      allUsers.map(async (user) => {
        let data = {
          userId: "",
          location: { lat: 0, lng: 0 },
          userIs: "",
          count: "",
        };

        const userId = user._id;

        // adding the user id to be sent
        data.userId = userId;

        // adding the location to be sent
        data.location.lat = user.location.lat;
        data.location.lng = user.location.lng;

        // getting the helps
        const helps = await HelperModel.find({ userId });

        // calculating the total helps
        let totalHelps =
          !helps || helps.length == 0 ? 0 : helps[0].requests.length;

        // getting the requests
        const requests = await RequestModel.find({ userId });

        // calculating the total requests
        let totalRequests = !requests ? 0 : requests.length;

        if (totalHelps == 0 && totalRequests == 0) {
          data.userIs = "not set";
          data.count = -1;
        } else if (totalRequests > totalHelps) {
          data.userIs = "requester";
          data.count = totalRequests;
        } else {
          data.userIs = "helper";
          data.count = totalHelps;
        }

        // adding the data
        mapData.push(data);
      })
    );

    return NextResponse.json({
      success: true,
      message: "Sent location data",
      mapData,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
