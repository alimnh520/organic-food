import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
