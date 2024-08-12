import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    role: {
        type: String,
        default: "",
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    isDelete: {
        type: String,
        default: "",
    },
    phonenumber: {
        type: String,
        default: "",
    },
    image_url: {
        type: String,
        default: "",
    },
    public_id: {
        type: String,
        default: "",
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;