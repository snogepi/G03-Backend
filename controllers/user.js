import { StudentModel } from '../models/user.js'
import { StaffModel } from '../models/user.js'

export async function studentRegister(body) {
    let newStudentUser = new StudentModel({
        student_num: body.student_num,
        name: body.name,
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