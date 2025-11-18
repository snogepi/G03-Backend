import mongoose from "mongoose";

const rfidLogSchema = new mongoose.Schema({
    rfid_tag: {
        type: String,
        required: true
    },
    request_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        required: true
    },
    user_type: {
        type: String,
        required: true,
        enum: ["Student", "Staff"]
    },
    action: {
        type: String,
        enum: ["CLAIM", "OVERRIDE"]
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export const RFIDLogModel = mongoose.model("RFID_Log", rfidLogSchema)