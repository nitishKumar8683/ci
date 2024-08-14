import mongoose from "mongoose";


const passSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    from: {
        type: String,
        required: true,
        trim: true,
    },
    where: {
        type: String,
        required: true,
        trim: true,
    },
    days: {
        type: String,
        enum: ['30', '60', '90'],
        required: true,
    },
    busType: {
        type: String,
        enum: ['Basic', 'Standard', 'Premium'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});


const Pass = mongoose.models.pass || mongoose.model("pass", passSchema);

export default Pass;
