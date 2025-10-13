import mongoose, { mongo } from "mongoose"

const studentSchema = new mongoose.Schema({
    student_num: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    program: {
        type: String,
    },
    year_level: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Enrolled", "Unenrolled", "Graduated", "On Leave (LOA)"],
        default: "Enrolled"
    },
    rfid_tag: {
        type: String
    }
})

const staffSchema = new mongoose.Schema({
    staff_num: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// export const className = mongoose.model('collectionName', instance)
export const StudentModel = mongoose.model('Student', studentSchema)
export const StaffModel = mongoose.model('Staff', staffSchema)