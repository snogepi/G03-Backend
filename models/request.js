// import mongoose
import mongoose, { mongo } from "mongoose";
import { DocumentModel } from "./document.js";

// create schema?
// const schemaName = new monggose.Schema({ fieldName: { type: String example lang } })
const requestSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    doc_type_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true
        }
    ],
    purpose: {
        type: String,
        required: true
    },
    request_date: {
        type: Date,
        default: Date.now,
    },
    proof_of_payment: {
        type: String,
        default: null
    },
    payment_verified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        default: null
    },
    processing_time: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ['PENDING (Clearance)', 'PENDING (Payment)', 'PREPARING', 'FOR PICKUP', 'CLAIMED'],
        default: 'PENDING (Clearance)'
    },
    remarks: {
        type: String,
        default: null
    },
    release_date: {
        type: Date,
        default: null
    }
})

// not yet approved!
// requestSchema.index({ request_date: 1 }, { expireAfterSeconds: 2592000 })

// export const className = mongoose.model('collectionName', instance)
export const RequestModel = mongoose.model('Request', requestSchema)