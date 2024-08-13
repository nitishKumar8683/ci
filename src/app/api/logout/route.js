import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
            status: 200 
        });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
