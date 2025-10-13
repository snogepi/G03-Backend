import { StudentModel } from '../models/user.js'
import { StaffModel } from '../models/user.js'

export async function studentRegister(body) {
    let newStudentUser = new StudentModel({
        student_num: body.student_num,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        program: body.program,
        year_level: body.year_level,
        status: body.status
    })

    return newStudentUser.save().then((user, error) => {
        return !(error)
    })
}

export async function staffRegister(body) {
    let newStaffUser = new StaffModel({
        staff_num: body.staff_num,
        name: body.name,
        email: body.email,
        password: body.password
    })

    return newStaffUser.save().then((user, error) => {
        return !(error)
    })
}

export async function studentLogin(body) {
    const { email, password } = body;

    try {
        const user = await StudentModel.findOne({ email })

        if (!user) {
            return { success: false, message: 'Student not found.'}
        }

        if (user.password !== password) {
            return { success: false, message: 'Incorrect password.'}
        }

        return {
            success: true,
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.email,
                student_id: user.student_num
            }
        }
    } catch (error) {
        console.error('Student login error:', error)
        return { success: false, message: 'Server error during login.' }
    }
}

export async function staffLogin(body) {
    const { email, password } = body;

    try {
        const user = await StaffModel.findOne({ email })

        if (!user) {
            return { success: false, message: 'Staff not found.'}
        }

        if (user.password !== password) {
            return { success: false, message: 'Incorrect password.'}
        }

        return {
            success: true,
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.email,
                staff_id: user.staff_num
            }
        }
    } catch (error) {
        console.error('Staff login error:', error)
        return { success: false, message: 'Server error during login.'}
    }
}