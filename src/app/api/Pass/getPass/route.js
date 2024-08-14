import { connect } from "../../../../db/dbConfig";
import Pass from "../../../../models/passModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

connect();

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value;
        console.log("Token from cookies:", token);

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decodedToken = verifyToken(token);
        const userId = decodedToken.id;
        console.log("Decoded Token:", decodedToken);
        console.log("User ID:", userId);

        const userIdObj = new ObjectId(userId);

        // Updated Aggregation Pipeline
        const leaveData = await Pass.aggregate([
            { $match: { userId: userIdObj } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    _id: 1,
                    from: 1,
                    where: 1,
                    days: 1,
                    status: 1,
                    busType: 1,
                    userDetails: {
                        _id: 1,
                        name: 1,
                        email: 1,
                    },
                },
            },
        ]);

        console.log("Aggregation Pipeline Result:", leaveData);

        return NextResponse.json(leaveData);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
