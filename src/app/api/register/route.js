import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../models/userModel";
import { connect } from "../../../db/dbConfig"
import mailSender from "../../../helpers/mailSender";
import emailTemplate from "../../../helpers/template/emailTemplate";

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { firstName, lastName, password, email, phonenumber } = reqBody
        console.log(firstName, lastName, password, email, phonenumber)

        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({
                message: "User already exists",
                status: 400 
            })
        }

        try {
            const emailResponse = await mailSender(
                email,
                "Your Account Information",
                emailTemplate(email, password),
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return NextResponse.json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: "user",
            phonenumber,
            isDelete: "",
            image_url: "",
            public_id: "",
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            savedUser,
            success: true,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error creating user",
                error: error.message,
            },
            { status: 500 },
        );
    }
}