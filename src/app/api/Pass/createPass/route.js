import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
import Pass from "../../../../models/passModel";

connect()

export async function POST(req) {
    try {
        const data = await req.json();
        const { userId, from, where, days, busType } = data;

        if (!userId || !from || !where || !days || !busType) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const newPass = new Pass({
            userId,
            from,
            where,
            days,
            busType,
            isDelete : "",
            status : "Pending",
            createdAt: new Date()
        });

      
        await newPass.save();

     
        return new Response(
            JSON.stringify({ message: 'Bus pass created successfully', pass: newPass }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error creating bus pass:', error);


        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
