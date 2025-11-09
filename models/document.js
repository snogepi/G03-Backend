// import mongoose
import mongoose from "mongoose";

// create schema?
// const schemaName = new monggose.Schema({ fieldName: { type: String example lang } })
const documentSchema = new mongoose.Schema({
    doc_name: {
        type: String,
        required: true,
        unique: true
    },
    processing_time: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true,
        default: 0
    }
})

// export const className = mongoose.model('collectionName', instance)
export const DocumentModel = mongoose.model('Document', documentSchema)