import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { StudentModel } from '../models/user.js'
import { StaffModel } from '../models/user.js'

export async function studentRegister(body) {
    const hashedPassword = await bcrypt.hash(body.password, 10)

    let newStudentUser = new StudentModel({
        student_number: body.student_number,
        first_name: body.first_name,
        middle_name: body.middle_name,
        last_name: body.last_name,
        extensions: body.extensions,
        email: body.email,
        password: hashedPassword,
        program: body.program,
        year_level: body.year_level,
        status: body.status
    })

    try {
        await newStudentUser.save()
        return { success: true }
    }

    catch(error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export async function staffRegister(body) {
    const hashedPassword = await bcrypt.hash(body.password, 10)

    let newStaffUser = new StaffModel({
        employee_number: body.employee_number,
        first_name: body.first_name,
        middle_name: body.middle_name,
        last_name: body.last_name,
        extensions: body.extensions,
        email: body.email,
        password: hashedPassword
    })

    try {
        await newStaffUser.save()
        return { success: true }
    }

    catch(error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export async function studentLogin(body) {
    const { email, password } = body;

    try {
        const user = await StudentModel.findOne({ email })

        if (!user) {
            return { success: false, message: 'Student not found.'}
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return { success: false, message: 'Incorrect password.'}
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: "Student"
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        return {
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                email: user.email,
                student_id: user.student_number,
                role: "Student"
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

        if (!(await bcrypt.compare(password, user.password))) {
            return { success: false, message: 'Incorrect password.'}
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: "Staff"
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        return {
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                email: user.email,
                staff_id: user.employee_number,
                role: "Staff"
            }
        }
    } catch (error) {
        console.error('Staff login error:', error)
        return { success: false, message: 'Server error during login.'}
    }
}