import { StudentModel } from '../models/user.js'
import { StaffModel } from '../models/user.js'
import bcrypt from 'bcrypt'

export async function studentRegister(body) {
    const hashedPassword = await bcrypt.hash(body.password, 10)

    let newStudentUser = new StudentModel({
        student_number: body.student_number,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        extensions: body.extensions,
        email: body.email,
        password: hashedPassword,
        program: body.program,
        year_level: body.year_level,
        status: body.status
    })

    return newStudentUser.save().then((user, error) => {
        return !(error)
    })
}

export async function staffRegister(body) {
    const hashedPassword = await bcrypt.hash(body.password, 10)

    let newStaffUser = new StaffModel({
        employee_number: body.employee_number,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        extensions: body.extensions,
        email: body.email,
        password: hashedPassword
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

        if (!bcrypt.compare(password, user.password)) {
            return { success: false, message: 'Incorrect password.'}
        }

        return {
            success: true,
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.email,
                student_id: user.student_number
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
                staff_id: user.employee_number
            }
        }
    } catch (error) {
        console.error('Staff login error:', error)
        return { success: false, message: 'Server error during login.'}
    }
}