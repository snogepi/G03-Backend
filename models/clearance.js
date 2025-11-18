import mongoose from "mongoose";

const ClearanceSchema = new mongoose.Schema({
    request_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    verified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        default: null
    },
    status: {
        type: String,
        enum: ['PENDING', 'CLEARED', 'NOT CLEARED'],
        default: 'PENDING',
        required: true
    },
    remarks: {
        type: String,
        default: ""
    },
    verified_date: {
        type: Date,
        default: null
    }
})

export const ClearanceModel = mongoose.model("Clearance", ClearanceSchema)